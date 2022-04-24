"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreCollectionProviders = exports.FirestoreOptionsProvider = exports.FirestoreDatabaseProvider = void 0;
const player_entity_1 = require("../player/entities/player.entity");
exports.FirestoreDatabaseProvider = 'firestoredb';
exports.FirestoreOptionsProvider = 'firestoreOptions';
exports.FirestoreCollectionProviders = [
    player_entity_1.Player.collectionName,
];
//# sourceMappingURL=firestore.provider.js.map