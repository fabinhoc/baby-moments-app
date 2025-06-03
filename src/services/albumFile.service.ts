import useApi from 'src/composables/useApi';
import { type AlbumFileType } from 'src/types/AlbumFile.type';

export default function useAlbumFileService() {
  const { get, post, put, all, remove, findById } = useApi('album-files');
  const { api } = useApi('album-files');

  const uploadChunks = (payload: any) => {
    return api.post<AlbumFileType>('album-files/upload-chunks', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    get,
    post,
    put,
    all,
    remove,
    findById,
    uploadChunks,
  };
}
