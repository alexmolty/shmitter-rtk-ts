import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Stats} from "../../utils/types";

interface ChangeStatsPayload {
    statsType: keyof Stats;
    sum: number;
}

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        followers: 0,
        following: 0
    } as Stats,
    reducers: {
        changeStats: {
            reducer: (state, action: PayloadAction<ChangeStatsPayload>) => {
                const res = state[action.payload.statsType] + action.payload.sum;
                state[action.payload.statsType] = res >= 0 ? res : 0;
            },
            prepare: (statsType: keyof Stats, sum: number) =>
                ({
                    payload: {statsType, sum} as ChangeStatsPayload
                }),
        }
    }
})

export const {changeStats} = statsSlice.actions;
export default statsSlice.reducer;