import { _decorator, Component, Node, Label, Enum, CCObject, director, Button, AudioSource } from 'cc';
import { BlockSpawner } from '../Block/BlockSpawner';
import { MyEnum } from '../MyEnum';
import { Player } from '../Player';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    
    //#region Singleton
    public static Instance: GameManager|null = null;
    onLoad(){
        if(GameManager.Instance == null){
            GameManager.Instance = this;
        }
    }

    //#endregion

    @property({type:Label})
    private m_ScoreBoard: Label|null = null;

    @property({type:BlockSpawner})
    private m_BlockSpawner: BlockSpawner|null = null;

    @property({type:Player})
    private m_Player: Player|null = null;

    @property({type:Button})
    private m_PlayButton: Button|null = null;

    @property({type:AudioSource})
    private m_ScoreAudioSource: AudioSource|null = null;

    private m_GameState: MyEnum;
    private m_CurrentScore: number = 0;
    private m_CurrentLevel: number = 0;

    private m_LevelDifference: number = 5;



    start() {
        this.m_GameState = MyEnum.GAME_START;
    }

    update(deltaTime: number) {
        switch(this.m_GameState){
            case MyEnum.GAME_START:{
                this.OnGameStart();
                break;
            }
            case MyEnum.GAME_PLAYING:{
                this.OnGamePlaying();
                break;
            }
            case MyEnum.GAME_END:{
                this.OnGameEnd();
                break;
            }
            default:{
                break;
            }
        }
    }

    private OnGameStart(){
        this.m_PlayButton.node.active = true;
        this.m_BlockSpawner.SetActive(false);
        this.m_Player.SetActive(false);
    }

    private OnGamePlaying(){
        if(this.m_CurrentScore % this.m_LevelDifference == 0 
            && this.m_CurrentScore > 0
            && this.m_CurrentLevel != this.m_BlockSpawner.GetCurrentLevel()){
                
                this.m_BlockSpawner.IncreaseSpawnSpeed();
                ++this.m_CurrentLevel;
                
        }
    }

    private OnGameEnd(){
        this.ReloadLevel();
        this.SetGameState(MyEnum.GAME_START);
    }

    private OnPlayButtonClick(){
        this.m_PlayButton.node.active = false;
        this.m_BlockSpawner.SetActive(true);
        this.m_Player.SetActive(true);
        this.ResetScore();

        this.SetGameState(MyEnum.GAME_PLAYING);
    }

    public IncreaseScore(){
        this.m_CurrentScore += 1;
        this.UpdateScoreBoard();
        this.m_ScoreAudioSource.play();
    }

    public ResetScore(){
        this.m_CurrentScore = 0;
        this.UpdateScoreBoard();
    }

    public ReloadLevel(){
        this.m_Player.ResetPlayer();
        this.m_BlockSpawner.ResetBlockSpawner();
        this.m_BlockSpawner.SetActive(false);
    }

    public UpdateScoreBoard(){
        this.m_ScoreBoard.string = this.m_CurrentScore.toString();
    }

    public SetGameState(state: MyEnum){
        this.m_GameState = state;
    }

    public GetPlayerPos(){
        return this.m_Player.node.position;
    }

    public GetBlockSpawner(){
        return this.m_BlockSpawner;
    }


}


