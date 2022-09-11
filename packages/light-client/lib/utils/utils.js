import bls from "@chainsafe/bls/switchable";
import { ssz } from "@lodestar/types";
export function sumBits(bits) {
    return bits.getTrueBitIndexes().length;
}
export function isZeroHash(root) {
    for (let i = 0; i < root.length; i++) {
        if (root[i] !== 0) {
            return false;
        }
    }
    return true;
}
export function assertZeroHashes(rootArray, expectedLength, errorMessage) {
    if (rootArray.length !== expectedLength) {
        throw Error(`Wrong length ${errorMessage}`);
    }
    for (const root of rootArray) {
        if (!isZeroHash(root)) {
            throw Error(`Not zeroed ${errorMessage}`);
        }
    }
}
/**
 * Util to guarantee that all bits have a corresponding pubkey
 */
export function getParticipantPubkeys(pubkeys, bits) {
    // BitArray.intersectValues() checks the length is correct
    return bits.intersectValues(pubkeys);
}
export function toBlockHeader(block) {
    return {
        slot: block.slot,
        proposerIndex: block.proposerIndex,
        parentRoot: block.parentRoot,
        stateRoot: block.stateRoot,
        bodyRoot: ssz.altair.BeaconBlockBody.hashTreeRoot(block.body),
    };
}
function deserializePubkeys(pubkeys) {
    return Array.from(pubkeys).map((pk) => bls.PublicKey.fromBytes(pk));
}
function serializePubkeys(pubkeys) {
    return pubkeys.map((pk) => pk.toBytes());
}
export function deserializeSyncCommittee(syncCommittee) {
    return {
        pubkeys: deserializePubkeys(syncCommittee.pubkeys),
        aggregatePubkey: bls.PublicKey.fromBytes(syncCommittee.aggregatePubkey),
    };
}
export function serializeSyncCommittee(syncCommittee) {
    return {
        pubkeys: serializePubkeys(syncCommittee.pubkeys),
        aggregatePubkey: syncCommittee.aggregatePubkey.toBytes(),
    };
}
export function isEmptyHeader(header) {
    const emptyValue = ssz.phase0.BeaconBlockHeader.defaultValue();
    return ssz.phase0.BeaconBlockHeader.equals(emptyValue, header);
}
// Thanks https://github.com/iliakan/detect-node/blob/master/index.esm.js
export const isNode = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
//# sourceMappingURL=utils.js.map