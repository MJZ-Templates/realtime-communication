import { create } from 'zustand';

const useRoomUIStore = create((set) => ({
  showModal: true,
  question: '',
  copied: false,

  setQuestion: (q) => set({ question: q }),
  showModalBox: () => set({ showModal: true }),
  hideModalBox: () => set({ showModal: false }),
  showToast: () => set({ copied: true }),
  hideToast: () => set({ copied: false }),
}));

export default useRoomUIStore;
