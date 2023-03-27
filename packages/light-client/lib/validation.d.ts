import { altair, Root, Slot, allForks } from "@lodestar/types";
import { BeaconConfig } from "@lodestar/config";
import { SyncCommitteeFast } from "./types.js";
/**
 *
 * @param config the beacon node config
 * @param syncCommittee the sync committee update
 * @param update the light client update for validation
 */
export declare function assertValidLightClientUpdate(config: BeaconConfig, syncCommittee: SyncCommitteeFast, update: allForks.LightClientUpdate): void;
/**
 * Proof that the state referenced in `update.finalityHeader.stateRoot` includes
 * ```ts
 * state = {
 *   finalizedCheckpoint: {
 *     root: update.header
 *   }
 * }
 * ```
 *
 * Where `hashTreeRoot(state) == update.finalityHeader.stateRoot`
 */
export declare function assertValidFinalityProof(update: allForks.LightClientFinalityUpdate): void;
/**
 * Proof that the state referenced in `update.header.stateRoot` includes
 * ```ts
 * state = {
 *   nextSyncCommittee: update.nextSyncCommittee
 * }
 * ```
 *
 * Where `hashTreeRoot(state) == update.header.stateRoot`
 */
export declare function assertValidSyncCommitteeProof(update: allForks.LightClientUpdate): void;
/**
 * Assert valid signature for `signedHeader` with provided `syncCommittee`.
 *
 * update.syncCommitteeSignature signs over the block at the previous slot of the state it is included.
 * ```py
 * previous_slot = max(state.slot, Slot(1)) - Slot(1)
 * domain = get_domain(state, DOMAIN_SYNC_COMMITTEE, compute_epoch_at_slot(previous_slot))
 * signing_root = compute_signing_root(get_block_root_at_slot(state, previous_slot), domain)
 * ```
 * Ref: https://github.com/ethereum/consensus-specs/blob/v1.1.10/specs/altair/beacon-chain.md#sync-aggregate-processing
 *
 * @param syncCommittee SyncPeriod that signed this update: `computeSyncPeriodAtSlot(update.header.slot) - 1`
 * @param forkVersion ForkVersion that was used to sign the update
 * @param signedHeaderRoot Takes header root instead of the head itself to prevent re-hashing on SSE
 */
export declare function assertValidSignedHeader(config: BeaconConfig, syncCommittee: SyncCommitteeFast, syncAggregate: altair.SyncAggregate, signedHeaderRoot: Root, signedHeaderSlot: Slot): Promise<void>;
//# sourceMappingURL=validation.d.ts.map