import { EPOCHS_PER_SYNC_COMMITTEE_PERIOD, SLOTS_PER_EPOCH } from "@lodestar/params";
export function getCurrentSlot(config, genesisTime) {
    const diffInSeconds = Date.now() / 1000 - genesisTime;
    return Math.floor(diffInSeconds / config.SECONDS_PER_SLOT);
}
/** Returns the slot if the internal clock were advanced by `toleranceSec`. */
export function slotWithFutureTolerance(config, genesisTime, toleranceSec) {
    // this is the same to getting slot at now + toleranceSec
    return getCurrentSlot(config, genesisTime - toleranceSec);
}
/**
 * Return the epoch number at the given slot.
 */
export function computeEpochAtSlot(slot) {
    return Math.floor(slot / SLOTS_PER_EPOCH);
}
/**
 * Return the sync committee period at slot
 */
export function computeSyncPeriodAtSlot(slot) {
    return computeSyncPeriodAtEpoch(computeEpochAtSlot(slot));
}
/**
 * Return the sync committee period at epoch
 */
export function computeSyncPeriodAtEpoch(epoch) {
    return Math.floor(epoch / EPOCHS_PER_SYNC_COMMITTEE_PERIOD);
}
export function timeUntilNextEpoch(config, genesisTime) {
    const milliSecondsPerEpoch = SLOTS_PER_EPOCH * config.SECONDS_PER_SLOT * 1000;
    const msFromGenesis = Date.now() - genesisTime * 1000;
    if (msFromGenesis >= 0) {
        return milliSecondsPerEpoch - (msFromGenesis % milliSecondsPerEpoch);
    }
    else {
        return Math.abs(msFromGenesis % milliSecondsPerEpoch);
    }
}
//# sourceMappingURL=clock.js.map