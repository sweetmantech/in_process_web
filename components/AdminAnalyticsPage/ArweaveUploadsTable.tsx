"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MessagesTableLoading from "@/components/AdminMessagesPage/MessagesTableLoading";
import NoMessagesFound from "@/components/AdminMessagesPage/NoMessagesFound";
import { useArweaveLogs } from "@/hooks/useArweaveLogs";
import ArweaveUploadsTableContents from "./ArweaveUploadsTableContents";

interface ArweaveUploadsTableProps {
  limit?: number;
}

const ArweaveUploadsTable = ({ limit = 10 }: ArweaveUploadsTableProps) => {
  const { data, isLoading, error, currentPage, setCurrentPage } = useArweaveLogs({ limit });

  if (isLoading) return <MessagesTableLoading />;
  if (error) return <p className="text-red-500">Error loading arweave uploads</p>;

  const logs = data?.logs ?? [];
  const count = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / limit));
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Arweave Upload Logs</span>
          <Badge variant="outline">
            Page {currentPage} / {totalPages}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <NoMessagesFound />
        ) : (
          <>
            <ArweaveUploadsTableContents logs={logs} />
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!hasPrevPage}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasNextPage}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArweaveUploadsTable;
