import { _decorator, Component, Node, Vec3 } from 'cc';
import { Block } from './Block';
const { ccclass, property } = _decorator;

@ccclass('SmallBlock')
export class SmallBlock extends Block {
    start() {
        super.start();

        this.SetBlockPosition();

    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }

    SetBlockPosition(){
        let left = -200;
        let right = 200;
        let posX = Math.random() * (right - left) + left;

        this.node.position = new Vec3(posX, this.node.position.y, this.node.position.z);
    }
}


