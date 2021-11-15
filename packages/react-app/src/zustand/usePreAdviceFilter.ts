import create from "zustand";

interface PreAdviceFilterState {
  selectedPreAdviceId: string;
  setSelectedPreAdvice: (preAdviceId: string) => void;
  clearSelectedPreAdvice: () => void;
}

const usePreAdviceFilter = create<PreAdviceFilterState>((set) => ({
  selectedPreAdviceId: "",
  setSelectedPreAdvice: (preAdviceId) =>
    set(() => ({ selectedPreAdviceId: preAdviceId })),
  clearSelectedPreAdvice: () => set(() => ({ selectedPreAdviceId: "" })),
}));

export default usePreAdviceFilter;
