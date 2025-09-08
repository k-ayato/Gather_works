import React from 'react';
import GameCard from './main_card'; // 上記で作成したコンポーネントをインポート

// APIから取得したと仮定するサンプルデータ
const sampleRecruitData = [
{
    id: 'rec1',
    gameTitle: 'VALORANT コンペティティブ',
    description: 'ランク@2募集！ ゴールド帯で楽しくできる方！',
    currentMembers: 3,
    maxMembers: 5,
    tags: ['初心者歓迎', 'ランク上げ', 'VCあり'],
    iconPath: '../../assets/icons/man_icon.svg',
},
{
    id: 'rec2',
    gameTitle: 'Apex Legends カジュアル',
    description: 'カジュアルでワイワイ遊びましょう！',
    currentMembers: 1,
    maxMembers: 3,
    tags: ['エンジョイ', 'VCなしOK'],
    iconPath: '../../assets/icons/man_icon.svg',
},
{
    id: 'rec3',
    gameTitle: 'モンスターハンターNow',
    description: '星8ジンオウガを一緒に狩りませんか？',
    currentMembers: 2,
    maxMembers: 4,
    tags: ['HR100以上', 'いつでも'],
    iconPath: '../../assets/icons/man_icon.svg',
},
];


const GameCardList: React.FC = () => {
// useEffectなどを使ってAPIからデータをフェッチする処理をここに入れる

return (
    <div className="center">
    {/* 取得したデータをmap関数で展開し、GameCardコンポーネントを生成 */}
    {sampleRecruitData.map((data) => (
        <GameCard
        key={data.id} // ループで描画する要素には一意のkeyを持たせる
        id={data.id}
        gameTitle={data.gameTitle}
        description={data.description}
        currentMembers={data.currentMembers}
        maxMembers={data.maxMembers}
        tags={data.tags}
        iconPath={data.iconPath}
        />
    ))}
    </div>
);
};

export default GameCardList;