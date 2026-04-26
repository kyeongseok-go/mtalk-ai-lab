'use client';

import { useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { notifications, type NotificationPriority } from '@/data/notifications';
import { cn } from '@/lib/utils';

const priorityConfig = {
  urgent: {
    label: '긴급',
    dotColor: '#fa5f69',
    bgColor: 'rgba(200, 16, 46, 0.05)',
    borderColor: 'rgba(200, 16, 46, 0.15)',
    textColor: '#fa5f69',
  },
  important: {
    label: '중요',
    dotColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.05)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
    textColor: '#d97706',
  },
  info: {
    label: '참고',
    dotColor: '#6b7280',
    bgColor: 'white',
    borderColor: '#e5e7eb',
    textColor: '#6b7280',
  },
};

function formatTime(ts: string): string {
  const now = new Date('2024-04-24T18:00:00');
  const date = new Date(ts);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '방금';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | NotificationPriority>('all');

  const filtered = notifications.filter(n =>
    filter === 'all' ? true : n.priority === filter
  );

  const counts = {
    all: notifications.length,
    urgent: notifications.filter(n => n.priority === 'urgent').length,
    important: notifications.filter(n => n.priority === 'important').length,
    info: notifications.filter(n => n.priority === 'info').length,
  };

  const unreadCounts = {
    all: notifications.filter(n => !n.isRead).length,
    urgent: notifications.filter(n => n.priority === 'urgent' && !n.isRead).length,
    important: notifications.filter(n => n.priority === 'important' && !n.isRead).length,
    info: notifications.filter(n => n.priority === 'info' && !n.isRead).length,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell size={20} className="text-gray-700" />
          <h1 className="text-xl font-bold text-gray-900">알림</h1>
        </div>
        <p className="text-sm text-gray-500">
          읽지 않은 알림 {unreadCounts.all}건
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(['all', 'urgent', 'important', 'info'] as const).map((f) => {
          const isActive = filter === f;
          const label = f === 'all' ? '전체' : priorityConfig[f].label;
          const count = counts[f];

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0',
                isActive
                  ? 'text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700'
              )}
              style={isActive ? { backgroundColor: 'var(--lg-red)' } : {}}
            >
              {label}
              <span
                className={cn(
                  'text-[10px] font-bold px-1 rounded',
                  isActive ? 'bg-red-700/30 text-red-100' : 'bg-gray-100 text-gray-500'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.map((n) => {
          const config = priorityConfig[n.priority];
          return (
            <div
              key={n.id}
              className={cn(
                'p-4 rounded-xl border transition-all',
                !n.isRead ? 'shadow-sm' : 'opacity-70'
              )}
              style={{
                backgroundColor: config.bgColor,
                borderColor: config.borderColor,
              }}
            >
              <div className="flex items-start gap-3">
                {/* Priority dot */}
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: n.isRead ? '#d1d5db' : config.dotColor }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                          style={{
                            backgroundColor: n.isRead ? '#f3f4f6' : `${config.dotColor}20`,
                            color: n.isRead ? '#9ca3af' : config.textColor,
                          }}
                        >
                          {config.label}
                        </span>
                        {!n.isRead && (
                          <span
                            className="text-[10px] font-medium"
                            style={{ color: config.textColor }}
                          >
                            NEW
                          </span>
                        )}
                      </div>
                      <p className={cn('text-sm font-semibold mt-1', n.isRead ? 'text-gray-600' : 'text-gray-900')}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {n.body}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">
                      {formatTime(n.timestamp)}
                    </span>
                  </div>

                  {n.actionLabel && !n.isRead && (
                    <button
                      className="mt-2 flex items-center gap-1 text-xs font-medium transition-colors"
                      style={{ color: config.textColor }}
                    >
                      {n.actionLabel}
                      <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Bell size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">알림이 없습니다</p>
        </div>
      )}
    </div>
  );
}
