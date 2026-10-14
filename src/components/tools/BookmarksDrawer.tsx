import React from 'react';
import { X, Bookmark, AlertCircle, Tag, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    progress, 
    toggleBookmarkDenial, 
    toggleBookmarkModifier, 
    toggleBookmarkTerm,
    setActiveModule 
  } = useAcademy();

  if (!isOpen) return null;

  const total = progress.bookmarkedDenials.length + progress.bookmarkedModifiers.length + progress.bookmarkedTerms.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white dark:bg-health-darkCard shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Saved Bookmarks ({total})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {total === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs">
                No bookmarked items yet. Click the bookmark icon on any CARC code, modifier, or term card to save it here for fast revision.
              </div>
            ) : (
              <>
                {/* Bookmarked Denials */}
                {progress.bookmarkedDenials.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      CARC Denial Codes ({progress.bookmarkedDenials.length})
                    </div>
                    <div className="space-y-1.5">
                      {progress.bookmarkedDenials.map(code => (
                        <div
                          key={code}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 text-xs hover:border-rose-500/40 transition-colors"
                        >
                          <div 
                            className="font-mono font-bold text-slate-900 dark:text-white flex-1 cursor-pointer hover:text-rose-500"
                            onClick={() => {
                              onClose();
                              setActiveModule('ar-playbook', `carc-${code.toLowerCase().replace('/', '-')}`);
                            }}
                          >
                            {code}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                setActiveModule('ar-playbook', `carc-${code.toLowerCase().replace('/', '-')}`);
                              }}
                              className="text-slate-400 hover:text-health-electric p-1"
                              title="Go to scenario"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBookmarkDenial(code)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bookmarked Modifiers */}
                {progress.bookmarkedModifiers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-500 mb-2">
                      <Tag className="w-3.5 h-3.5" />
                      Medical Modifiers ({progress.bookmarkedModifiers.length})
                    </div>
                    <div className="space-y-1.5">
                      {progress.bookmarkedModifiers.map(mod => (
                        <div
                          key={mod}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 text-xs hover:border-purple-500/40 transition-colors"
                        >
                          <div 
                            className="font-mono font-bold text-slate-900 dark:text-white flex-1 cursor-pointer hover:text-purple-500"
                            onClick={() => {
                              onClose();
                              setActiveModule('coding-modifiers');
                            }}
                          >
                            Modifier {mod}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                setActiveModule('coding-modifiers');
                              }}
                              className="text-slate-400 hover:text-health-electric p-1"
                              title="Go to modifier"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBookmarkModifier(mod)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bookmarked Terms */}
                {progress.bookmarkedTerms.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-500 mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      Terminology & Concepts ({progress.bookmarkedTerms.length})
                    </div>
                    <div className="space-y-1.5">
                      {progress.bookmarkedTerms.map(termId => (
                        <div
                          key={termId}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-health-darkSubtle/30 border border-slate-200 dark:border-slate-800 text-xs hover:border-sky-500/40 transition-colors"
                        >
                          <div 
                            className="font-medium text-slate-900 dark:text-white capitalize flex-1 truncate cursor-pointer hover:text-sky-500"
                            onClick={() => {
                              onClose();
                              setActiveModule('foundations', termId);
                            }}
                          >
                            {termId.replace(/-/g, ' ')}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                setActiveModule('foundations', termId);
                              }}
                              className="text-slate-400 hover:text-health-electric p-1"
                              title="Go to term"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleBookmarkTerm(termId)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
