"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const firestore_1 = require("@google-cloud/firestore");
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../player/entities/player.entity");
let GameService = class GameService {
    constructor(playerCollection) {
        this.playerCollection = playerCollection;
    }
    create(createGameDto) {
        return 'This action adds a new game';
    }
    findAll() {
        return `This action returns all game`;
    }
    findOne(id) {
        return `This action returns a #${id} game`;
    }
    update(id, updateGameDto) {
        return `This action updates a #${id} game`;
    }
    remove(id) {
        return `This action removes a #${id} game`;
    }
    async doAttack(res, attackDto) {
        if (!attackDto.to || !attackDto.warriors || !attackDto.generals ||
            isNaN(attackDto.warriors) || isNaN(attackDto.generals)) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send();
        }
        const playerRef = await this.playerCollection.doc(attackDto.from).get();
        if (!playerRef.exists) {
            return res.status(common_1.HttpStatus.NOT_FOUND).send();
        }
        const player = playerRef.data();
        const enemyPlayerRef = await this.playerCollection.doc(attackDto.to).get();
        if (!enemyPlayerRef.exists) {
            return res.status(common_1.HttpStatus.NOT_FOUND).send();
        }
        const enemy = enemyPlayerRef.data();
        if (player.warriors < attackDto.warriors || player.generals < attackDto.generals) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send();
        }
        return res.status(common_1.HttpStatus.OK).send({
            timestamp: firestore_1.Timestamp.now(),
            username: attackDto.from,
            attack: {
                timestampComplete: firestore_1.Timestamp.now()
            }
        });
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(player_entity_1.Player.collectionName)),
    __metadata("design:paramtypes", [firestore_1.CollectionReference])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map