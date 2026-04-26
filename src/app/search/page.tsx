'use client';

import { Search } from 'lucide-react';
import { useFeatureStore } from '@/store/featureStore';

export default function SearchPage() {
  const { features } = useFeatureStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Search size={20} className="text-gray-700" />
        <h1 className="text-xl font-bold text-gray-900">검색</h1>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder={
              features.semanticSearch
                ? '의미 기반 검색 (예: "지난 주 마이그레이션 결정사항")'
                : '채팅, 파일, 멤버 검색...'
            }
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            readOnly
          />
        </div>
        {features.semanticSearch && (
          <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            AI 의미 검색 활성화됨
          </p>
        )}
      </div>

      <div className="text-center py-16 text-gray-400">
        <Search size={40} className="mx-auto mb-3 opacity-20" />
        <p className="text-sm font-medium">검색어를 입력하세요</p>
        <p className="text-xs mt-1 opacity-70">채팅 메시지, 파일, 멤버를 검색할 수 있습니다</p>
      </div>
    </div>
  );
}
