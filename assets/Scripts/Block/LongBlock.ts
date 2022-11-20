import { _decorator, Component, Node, Vec3, UITransform, Size } from 'cc';
import { Block } from './Block';
const { ccclass, property } = _decorator;

@ccclass('LongBlock')
export class LongBlock extends Block {
    start() {
        super.start();

        this.SetBlockPosition();
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }

    private SetBlockPosition(){
        // set length
        let min = 300;
        let max = 500;
        let transform = this.getComponent(UITransform);
        let randomLength = Math.floor(Math.random() * (max - min) + min);
        transform.setContentSize(new Size(randomLength, transform.contentSize.y));

        // set pos
        let randomPos = Math.floor(Math.random() * 2);
        let posX;
        if(randomPos == 0){
            posX = -480 + transform.contentSize.x/2;
        }
        else if(randomPos == 1){
            posX = 480 - transform.contentSize.x/2;
        }

        this.node.position = new Vec3(posX, this.node.position.y, this.node.position.z);
    }

    
}


