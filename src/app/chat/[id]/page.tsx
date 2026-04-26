'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, MoreHorizontal, Paperclip, Link as LinkIcon } from 'lucide-react';
import { getChatRoom, chatRooms } from '@/data/messages';
import { getPerson, getMe } from '@/data/people';
import { cn } from '@/lib/utils';
import { SmartCatchup } from '@/components/chat/SmartCatchup';

function formatTime(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDate(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
}

function shouldShowDateDivider(curr: string, prev: string | undefined): boolean {
  if (!prev) return true;
  return new Date(curr).toDateString() !== new Date(prev).toDateString();
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-orange-500', 'bg-teal-500', 'bg-pink-500', 'bg-indigo-500',
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  return (
    <div
      className={`${sizeClass} ${colors[colorIdx]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {name.slice(0, 1)}
    </div>
  );
}

export default function ChatPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = getChatRoom(roomId);
  const me = getMe();

  if (!room) notFound();

  const categoryColors: Record<string, string> = {
    project: 'bg-red-500',
    team: 'bg-blue-500',
    executive: 'bg-slate-700',
    casual: 'bg-gray-500',
  };

  return (
    <div className="flex flex-col h-screen md:h-screen bg-gray-50">
      {/* Chat Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
        <Link href="/" className="md:hidden text-gray-400 hover:text-gray-600 p-1">
          <ArrowLeft size={18} />
        </Link>

        {/* Room List - Desktop Left Panel */}
        <div className="hidden md:flex items-center gap-2 mr-2">
          {chatRooms.map((r) => (
            <Link key={r.id} href={`/chat/${r.id}`}>
              <div
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                  r.id === roomId
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
                style={r.id === roomId ? { backgroundColor: 'var(--lg-red)' } : {}}
              >
                {r.name}
                {r.unreadCount > 0 && r.id !== roomId && (
                  <span
                    className="ml-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-0.5 rounded-full text-white text-[10px] font-bold"
                    style={{ backgroundColor: 'var(--lg-red)' }}
                  >
                    {r.unreadCount}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex-1 md:flex-none md:ml-auto flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${categoryColors[room.category]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
            {room.name.slice(0, 1)}
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-sm">{room.name}</h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users size={11} />
              <span>{room.memberIds.length}명</span>
              <span className="mx-1">·</span>
              <span className="truncate max-w-[180px]">{room.description}</span>
            </div>
          </div>
        </div>

        <button className="ml-auto text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal size={18} />
        </button>
      </header>

      {/* Smart Catchup — renders only when feature toggle is ON */}
      <SmartCatchup roomId={roomId} messages={room.messages} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {room.messages.map((msg, idx) => {
          const sender = getPerson(msg.senderId);
          const isMe = msg.senderId === me.id;
          const prev = room.messages[idx - 1];
          const showDate = shouldShowDateDivider(msg.timestamp, prev?.timestamp);
          const isSameSenderAsPrev =
            prev &&
            prev.senderId === msg.senderId &&
            !shouldShowDateDivider(msg.timestamp, prev.timestamp);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium px-2">
                    {formatDate(msg.timestamp)}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              )}

              <div
                className={cn(
                  'flex gap-2.5',
                  isMe ? 'flex-row-reverse' : 'flex-row',
                  isSameSenderAsPrev ? 'mt-0.5' : 'mt-3'
                )}
              >
                {/* Avatar */}
                {!isMe && (
                  <div className={isSameSenderAsPrev ? 'w-9 flex-shrink-0' : ''}>
                    {!isSameSenderAsPrev && sender && (
                      <Avatar name={sender.name} />
                    )}
                  </div>
                )}

                <div className={cn('flex flex-col', isMe ? 'items-end' : 'items-start', 'max-w-[70%]')}>
                  {/* Sender name */}
                  {!isMe && !isSameSenderAsPrev && sender && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-semibold text-gray-700">{sender.name}</span>
                      <span className="text-[10px] text-gray-400">{sender.role}</span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={cn(
                      'px-3 py-2 rounded-2xl text-sm leading-relaxed break-words',
                      isMe
                        ? 'rounded-tr-md text-white'
                        : 'rounded-tl-md bg-white text-gray-800 border border-gray-100 shadow-sm'
                    )}
                    style={isMe ? { backgroundColor: 'var(--lg-red)' } : {}}
                  >
                    {/* Mention highlight */}
                    {msg.mentionIds && msg.mentionIds.includes('me') ? (
                      <span>
                        {msg.content.replace('@고연구원', '')}
                        {msg.content.includes('@고연구원') && (
                          <span
                            className={cn(
                              'font-semibold rounded px-0.5',
                              isMe ? 'bg-red-700 text-red-100' : 'bg-red-50 text-red-600'
                            )}
                          >
                            @고연구원
                          </span>
                        )}
                      </span>
                    ) : (
                      msg.content
                    )}

                    {/* Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {msg.attachments.map((att, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg',
                              isMe
                                ? 'bg-red-700/40 text-red-100'
                                : 'bg-gray-50 text-gray-600 border border-gray-100'
                            )}
                          >
                            {att.type === 'link' ? (
                              <LinkIcon size={11} />
                            ) : (
                              <Paperclip size={11} />
                            )}
                            <span className="truncate">{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reactions + Time */}
                  <div className={cn('flex items-center gap-2 mt-0.5', isMe ? 'flex-row-reverse' : 'flex-row')}>
                    <span className="text-[10px] text-gray-400">{formatTime(msg.timestamp)}</span>
                    {msg.reactions && msg.reactions.map((r, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white border border-gray-100 rounded-full px-1.5 py-0.5 shadow-sm cursor-pointer hover:bg-gray-50"
                      >
                        {r.emoji} {r.count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            readOnly
          />
          <button
            className="text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--lg-red)' }}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
