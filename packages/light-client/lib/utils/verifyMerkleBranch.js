import { byteArrayEquals } from "@chainsafe/ssz";
import { hash } from "@chainsafe/persistent-merkle-tree";
export const SYNC_COMMITTEES_DEPTH = 4;
export const SYNC_COMMITTEES_INDEX = 11;
/**
 * Verify that the given ``leaf`` is on the merkle branch ``proof``
 * starting with the given ``root``.
 *
 * Browser friendly version of verifyMerkleBranch
 */
export function isValidMerkleBranch(leaf, proof, depth, index, root) {
    let value = leaf;
    for (let i = 0; i < depth; i++) {
        if (Math.floor(index / 2 ** i) % 2) {
            value = hash(proof[i], value);
        }
        else {
            value = hash(value, proof[i]);
        }
    }
    return byteArrayEquals(value, root);
}
//# sourceMappingURL=verifyMerkleBranch.js.map