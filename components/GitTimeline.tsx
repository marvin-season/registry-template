import { TGitCommitLog } from "@/types";
import { GitCommit, User, Calendar, MessageSquare } from "lucide-react";

export function GitTimeline(props: { gitCommitLog: TGitCommitLog }) {
  const { gitCommitLog } = props;

  if (!gitCommitLog || gitCommitLog.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <GitCommit className="h-8 w-8" />
          <p>暂无提交记录</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <GitCommit className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">提交历史</h3>
        <span className="text-sm text-muted-foreground">
          ({gitCommitLog.length} 条记录)
        </span>
      </div>

      <div className="relative">
        {/* 时间线连接线 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>

        <div className="space-y-6">
          {gitCommitLog.map((log, index) => (
            <div
              key={log.hash}
              className="relative flex items-start gap-4 group"
            >
              {/* 时间线节点 */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card border-2 border-primary/20 shadow-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-200">
                <GitCommit className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              </div>

              {/* 提交内容卡片 */}
              <div className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {log.message}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="font-medium">{log.author_name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(log.date).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* 提交哈希 */}
                  <span className="text-xs text-muted-foreground">
                    {log.hash.toString().slice(0, 16)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
