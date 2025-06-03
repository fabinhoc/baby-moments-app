import useApi from 'src/composables/useApi';

export default function useAlbumService() {
  const { get, findById } = useApi('albums');

  return {
    get,
    findById,
  };
}
