import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Block } from './Block';
const { ccclass, property } = _decorator;

@ccclass('BlockSpawnerf')
export class BlockSpawner extends Component {

    @property({type:Number})
    private m_SpawnInterval: number | null = 1;

    @property({type:Number})
    private m_BlockDropSpeed: number = 50;

    @property({type:Prefab})
    private m_BlockPrefab: Prefab[] = [];

    private m_Blocks: Node[] = [];
    private m_IsActive:boolean = true;
    private m_CurrentSpawnInterval:number;
    private m_MinSpawnInterval: number = 0.3;

    private m_SpawnCountDown: number = 0;

    private m_CurrentLevel: number = 0;

    start() {
        this.m_SpawnCountDown = this.m_SpawnInterval;
        this.m_CurrentSpawnInterval = this.m_SpawnInterval;
    }

    update(deltaTime: number) {
        if(this.m_IsActive){
            this.m_SpawnCountDown += deltaTime;
    
            if(this.m_SpawnCountDown >= this.m_CurrentSpawnInterval){
                this.SpawnBlock();
                this.m_SpawnCountDown = 0;
            }
        }
    }

    SpawnBlock(){
        let randomBlockIndex = Math.floor(Math.random() * this.m_BlockPrefab.length);
        let newBlock = instantiate(this.m_BlockPrefab[randomBlockIndex]);
        newBlock.parent = this.node.parent;
        newBlock.position = this.node.position;
        newBlock.getComponent(Block).SetSpeed(this.m_BlockDropSpeed);

        this.m_Blocks.push(newBlock);
    }

    public RemoveBlock(block: Node){
        let index = this.m_Blocks.indexOf(block, 0);
        if (index > -1) {
            this.m_Blocks.splice(index, 1);
        }
        block.destroy();
    }

    public ResetBlockSpawner(){
        this.m_Blocks.forEach(element => {
            // this.RemoveBlock(element);
            element.destroy();
        });

        this.m_SpawnCountDown = this.m_SpawnInterval;
        this.m_CurrentSpawnInterval = this.m_SpawnInterval;

    }

    public SetActive(active: boolean){
        this.m_IsActive = active;
    }

    public IncreaseSpawnSpeed(){
        this.m_CurrentSpawnInterval -= 0.5;
        if(this.m_CurrentSpawnInterval <= this.m_MinSpawnInterval){
            this.m_CurrentSpawnInterval = this.m_MinSpawnInterval;
        }
        else{
            ++this.m_CurrentLevel;
        }
        console.log("Cur: " + this.m_CurrentSpawnInterval.toString());
    }

    public GetCurrentLevel(){
        return this.m_CurrentLevel;
    }

}


