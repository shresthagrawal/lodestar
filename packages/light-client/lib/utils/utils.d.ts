import { altair, Root } from "@lodestar/types";
import { BeaconBlockHeader } from "@lodestar/types/phase0";
import { BitArray } from "@chainsafe/ssz";
import { SyncCommitteeFast } from "../types.js";
export declare function sumBits(bits: BitArray): number;
export declare function isZeroHash(root: Root): boolean;
export declare function assertZeroHashes(rootArray: Root[], expectedLength: number, errorMessage: string): void;
/**
 * Util to guarantee that all bits have a corresponding pubkey
 */
export declare function getParticipantPubkeys<T>(pubkeys: T[], bits: BitArray): T[];
export declare function toBlockHeader(block: altair.BeaconBlock): BeaconBlockHeader;
export declare function deserializeSyncCommittee(syncCommittee: altair.SyncCommittee): SyncCommitteeFast;
export declare function serializeSyncCommittee(syncCommittee: SyncCommitteeFast): altair.SyncCommittee;
export declare function isEmptyHeader(header: BeaconBlockHeader): boolean;
export declare const isNode: boolean;
//# sourceMappingURL=utils.d.ts.map