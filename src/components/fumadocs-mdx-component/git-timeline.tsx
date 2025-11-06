import { Calendar, GitCommit, MessageSquare, User } from 'lucide-react';
import type { TGitCommitLog } from '@/types';

export function GitTimeline(props: { gitCommitLog: TGitCommitLog }) {
  const { gitCommitLog } = props;

  if (!gitCommitLog || gitCommitLog.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="rounded-full bg-muted p-3">
            <GitCommit className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium">No commits yet</p>
          <p className="text-xs">No commit history yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 标题区域 */}
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <GitCommit className="h-4 w-4 text-primary" />
        Git Commit History
        <span className="text-xs text-muted-foreground font-normal">({gitCommitLog.length} commits)</span>
      </h2>

      <div className="relative">
        {/* 时间线连接线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/20 via-primary/40 to-primary/20"></div>

        <div className="space-y-3">
          {gitCommitLog.map((log, _index) => (
            <div key={log.hash} className="relative flex items-start gap-3 group">
              {/* 时间线节点 */}
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-primary/20 shadow-sm group-hover:border-primary/40 transition-all duration-200">
                <GitCommit className="h-3.5 w-3.5 text-primary" />
              </div>

              {/* 提交内容卡片 */}
              <div className="flex-1 rounded-md border bg-card p-3 shadow-xs group-hover:shadow-sm group-hover:border-primary/20 transition-all duration-200">
                <div className="space-y-2">
                  {/* 提交信息 */}
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3 w-3" />
                    <p className="text-sm font-medium text-foreground leading-snug">{log.message}</p>
                  </div>

                  {/* 元信息 */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{log.author_name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(log.date).toLocaleString('zh-CN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono cursor-pointer">
                      {log.hash.toString().slice(0, 8)}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
