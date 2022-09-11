import type { PublicKey } from "@chainsafe/bls/types";
import { altair, phase0, SyncPeriod } from "@lodestar/types";
export declare type LightClientStoreFast = {
    snapshot: LightClientSnapshotFast;
    bestUpdates: Map<SyncPeriod, altair.LightClientUpdate>;
};
export declare type LightClientSnapshotFast = {
    /** Beacon block header */
    header: phase0.BeaconBlockHeader;
    /** Sync committees corresponding to the header */
    currentSyncCommittee: SyncCommitteeFast;
    nextSyncCommittee: SyncCommitteeFast;
};
export declare type SyncCommitteeFast = {
    pubkeys: PublicKey[];
    aggregatePubkey: PublicKey;
};
//# sourceMappingURL=types.d.ts.map