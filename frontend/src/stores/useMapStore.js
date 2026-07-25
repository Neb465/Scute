import { create } from "zustand";

const searchInit = {
	query: "",
	coords: [],
	autoFillCanDisplay: false,
	// queryFocused: false,
	finalQuery: "",
};

export const useMapStore = create((set, get) => ({
	start: { ...searchInit },
	end: { ...searchInit },
	//autoFillDebounce: {start: null, end: null},

	handleInputChange: (type, value) => {
		// if (get().autoFillDebounce[type]){
		//   clearTimeout(get().autoFillDebounce[type]);
		// }

		set((state) => ({
			[type]: { ...state[type], query: value, coords: [], autoFillCanDisplay: true },
		}));

		// if(value.length < 3) {
		//   set((state) => ({ [type]: {...state[type], autoFillResults: []}}));
		// }

		// const timeout = setTimeout()
	},

	//value is the selected result's name
	handleAutoFillButton: (type, value) => {
		set((state) => ({
			[type]: {
				...state[type],
        //Display name is part of the geocode api search results
				query: value.display_name,
				coords: [parseFloat(value.lon), parseFloat(value.lat)],
				autoFillCanDisplay: false,
			},
		}));
	},

  handleFinalQuery: (type, value) => {
    set((state) => ({
      [type]: {
        ...state[type],
        finalQuery: value
      }
    }));
  }
}));
