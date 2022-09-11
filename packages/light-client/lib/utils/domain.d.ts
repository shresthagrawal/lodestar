import { Epoch, Version, Root, DomainType, phase0, Domain } from "@lodestar/types";
import { Type } from "@chainsafe/ssz";
/**
 * Return the domain for the [[domainType]] and [[forkVersion]].
 */
export declare function computeDomain(domainType: DomainType, forkVersion: Version, genesisValidatorRoot: Root): Uint8Array;
/**
 * Return the ForkVersion at an epoch from a Fork type
 */
export declare function getForkVersion(fork: phase0.Fork, epoch: Epoch): Version;
/**
 * Used primarily in signature domains to avoid collisions across forks/chains.
 */
export declare function computeForkDataRoot(currentVersion: Version, genesisValidatorsRoot: Root): Uint8Array;
/**
 * Return the signing root of an object by calculating the root of the object-domain tree.
 */
export declare function computeSigningRoot<T>(type: Type<T>, sszObject: T, domain: Domain): Uint8Array;
//# sourceMappingURL=domain.d.ts.map