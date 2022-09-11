// Only used by processDeposit +  lightclient
import { ssz } from "@lodestar/types";
/**
 * Return the domain for the [[domainType]] and [[forkVersion]].
 */
export function computeDomain(domainType, forkVersion, genesisValidatorRoot) {
    const forkDataRoot = computeForkDataRoot(forkVersion, genesisValidatorRoot);
    const domain = new Uint8Array(32);
    domain.set(domainType, 0);
    domain.set(forkDataRoot.slice(0, 28), 4);
    return domain;
}
/**
 * Return the ForkVersion at an epoch from a Fork type
 */
export function getForkVersion(fork, epoch) {
    return epoch < fork.epoch ? fork.previousVersion : fork.currentVersion;
}
/**
 * Used primarily in signature domains to avoid collisions across forks/chains.
 */
export function computeForkDataRoot(currentVersion, genesisValidatorsRoot) {
    const forkData = {
        currentVersion,
        genesisValidatorsRoot,
    };
    return ssz.phase0.ForkData.hashTreeRoot(forkData);
}
/**
 * Return the signing root of an object by calculating the root of the object-domain tree.
 */
export function computeSigningRoot(type, sszObject, domain) {
    const domainWrappedObject = {
        objectRoot: type.hashTreeRoot(sszObject),
        domain,
    };
    return ssz.phase0.SigningData.hashTreeRoot(domainWrappedObject);
}
//# sourceMappingURL=domain.js.map