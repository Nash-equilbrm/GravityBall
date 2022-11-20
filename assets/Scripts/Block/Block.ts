import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, Game } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {

    protected m_Speed: number = 50;

    protected m_PassedPlayer: boolean = false;

    protected m_CollideWithPlayer: boolean = false;

    protected m_LifeDuration: number = 3;

    protected m_DestroyCountDown: number = 0;

    start() {
        this.m_DestroyCountDown = this.m_LifeDuration;

        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        let newPos = new Vec3(this.node.position.x, this.node.position.y - this.m_Speed * deltaTime, this.node.position.z);
        this.node.position = newPos;
        if(!this.m_PassedPlayer && this.PassPlayer(GameManager.Instance.GetPlayerPos())){
            GameManager.Instance.IncreaseScore();
            this.m_PassedPlayer = true;
        }

        // set timer to destroy block
        else if(this.m_PassedPlayer){
            this.m_DestroyCountDown -= deltaTime;
            if(this.m_DestroyCountDown <= 0){
                this.DestroyBlock();
            }
        }


    }

    protected onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        this.m_CollideWithPlayer = true;
    }

    public SetSpeed(value: number){
        this.m_Speed = value;
    }

    protected PassPlayer(playerPos: Vec3){
        return (this.node.position.y < playerPos.y);
    }

    protected DestroyBlock(){
        GameManager.Instance.GetBlockSpawner().RemoveBlock(this.node);
    }
 
}


