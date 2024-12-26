import { request } from '@/utils/request';

export const useTypebots = ({
  folderId,
  workspaceId,
  onError,
}: {
  workspaceId?: string;
  folderId?: string | "root";
  onError: (error: Error) => void;
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTypebots = async () => {
    setIsLoading(true);
    try {
      const result = await request.get('/api/flow/query/org', {
        params: {
          pageNumber: 0,
          pageSize: 10
        }
      });
      setData(result.data);
    } catch (error: any) {
      onError(new Error(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypebots();
  }, [folderId, workspaceId]);

  return {
    typebots: data?.content,
    isLoading,
    refetch: fetchTypebots,
  };
}; 
