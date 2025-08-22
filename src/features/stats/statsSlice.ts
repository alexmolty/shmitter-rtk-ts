import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import {StatsEnum} from "../../utils/statsEnum.ts";

interface ChangeStatsPayload {
    statsType: StatsEnum;
    sum: number;
}

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        [StatsEnum.FOLLOWERS]: 0,
        [StatsEnum.FOLLOWING]: 0,
    },
    reducers: {
        changeStats: {
            reducer: (state, action: PayloadAction<ChangeStatsPayload>) => {
                const res = state[action.payload.statsType] + action.payload.sum;
                state[action.payload.statsType] = res >= 0 ? res : 0;
            },
            prepare: (statsType: StatsEnum, sum: number) =>
                ({
                    payload: {statsType, sum} as ChangeStatsPayload
                }),
        }
    }
})

export const {changeStats} = statsSlice.actions;
export default statsSlice.reducer;