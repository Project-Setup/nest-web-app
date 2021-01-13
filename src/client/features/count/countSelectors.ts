import { GlobalCountState } from './countSlice';

export const globalSelectCount = (state: GlobalCountState) => state.count.count;
