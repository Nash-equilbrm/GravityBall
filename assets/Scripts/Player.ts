import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, director, systemEvent, SystemEventType, EventKeyboard, macro, Vec3, ParticleSystem2D} from 'cc';
import { GameManager } from './Manager/GameManager';
import { MyEnum } from './MyEnum';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class Player extends Component {


    
    private m_StartPosition: Vec3;
    private m_LeftPosition: Vec3;
    private m_RightPosition: Vec3;

    private m_MoveRight: boolean;
    private m_Moving: boolean;

    private m_Speed = 2000;

    private m_IsActive: boolean = true;


    start() {
        this.m_LeftPosition = new Vec3(-400, -140, 0);
        this.m_RightPosition = new Vec3(400, -140, 0);
        this.m_StartPosition = new Vec3(0, -140, 0);

        this.node.position = this.m_StartPosition;

        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        this.m_MoveRight = true;
        this.m_Moving = false;
    }
    

    update(deltaTime: number) {
        if(this.m_IsActive){
            if (this.m_Moving == true)
            {
                if (this.m_MoveRight == true)
                {
                    let newPos = new Vec3(this.node.position.x + this.m_Speed * deltaTime, this.node.position.y,this.node.position.z);
                    if (newPos.x > this.m_RightPosition.x)
                    {
                        this.m_Moving = false;
                        
                    }
                    this.node.position = newPos;
                }
                else
                {
                    let newPos = new Vec3(this.node.position.x - this.m_Speed * deltaTime, this.node.position.y,this.node.position.z);
                    if (newPos.x < this.m_LeftPosition.x)
                    {
                        this.m_Moving = false;
                    }
                    this.node.position = newPos;
                }
            }
        }
 
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        GameManager.Instance.SetGameState(MyEnum.GAME_END);
    }

    onKeyDown(event: EventKeyboard){
        switch(event.keyCode) {
            case macro.KEY.a:
                if (this.m_Moving == false)
                {
                    if (this.m_MoveRight == true)
                    {
                        this.m_MoveRight = false;
                        this.m_Moving = true;
                    }
                    else
                    {
                        this.m_MoveRight = true;
                        this.m_Moving = true;
                    }
                }
             
               break;

        }
 
    }

    public ResetPlayer(){
        this.node.position = this.m_StartPosition;

        this.m_MoveRight = true;
        this.m_Moving = false;
       
    }


    public SetActive(active: boolean){
        this.m_IsActive = active;
    }
    
}


