export var LightclientEvent;
(function (LightclientEvent) {
    /**
     * New head
     */
    LightclientEvent["head"] = "head";
    /**
     * New finalized
     */
    LightclientEvent["finalized"] = "finalized";
    /**
     * Stored nextSyncCommittee from an update at period `period`.
     * Note: the SyncCommittee is stored for `period + 1`.
     */
    LightclientEvent["committee"] = "committee";
})(LightclientEvent || (LightclientEvent = {}));
//# sourceMappingURL=events.js.map