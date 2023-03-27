import { ChainConfig } from "@lodestar/config";
import { Epoch, Slot, SyncPeriod } from "@lodestar/types";
export declare function getCurrentSlot(config: ChainConfig, genesisTime: number): Slot;
/** Returns the slot if the internal clock were advanced by `toleranceSec`. */
export declare function slotWithFutureTolerance(config: ChainConfig, genesisTime: number, toleranceSec: number): Slot;
/**
 * Return the epoch number at the given slot.
 */
export declare function computeEpochAtSlot(slot: Slot): Epoch;
/**
 * Return the sync committee period at slot
 */
export declare function computeSyncPeriodAtSlot(slot: Slot): SyncPeriod;
/**
 * Return the sync committee period at epoch
 */
export declare function computeSyncPeriodAtEpoch(epoch: Epoch): SyncPeriod;
export declare function timeUntilNextEpoch(config: Pick<ChainConfig, "SECONDS_PER_SLOT">, genesisTime: number): number;
//# sourceMappingURL=clock.d.ts.map