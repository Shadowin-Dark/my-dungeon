# 数据层设计文档

## 实体

### 地块 - **field**

1. id
2. name - 地块名称
3. sideEffect - 地块效果，函数集
   1. movestart
      1. input: **player**
      2. output: **player**
   2. movein
      1. input: **player**
      2. output: **player**
   3. moveout
      1. input: **player**
      2. output: **player**
   4. battle
      1. input: **player**,**monster**
      2. output: **player**,**monster**
   5. moveend
      1. input: **player**
      2. output: **player**
4. **monster**
5. **player**
6. description
7. \*logo
8. \*image

### 地图 - **world**

1. map: array for N\*M **mapUnit**: N for row, M for column
   1. **field**.id
   2. hide - 地块是否被探索
   3. **monster**.id
2. players: array for **player**
3. playerPos: arrary for [x,y] not player positions
4. focus: [x,y] 当前选中的 地块 坐标
5. current: note 当前游戏进程 包括：
   1. playerID: 当前是哪个 player 的回合
   2. state: 进行的阶段 one of [start, move, battle, end]

### 怪物 - **monster**

1. ATK
2. HP
3. array for abilities
   1. battle
   2. demage
   3. defense
4. deathcall

### 玩家 **player**

1. id
2. STR
3. DEX
4. INT
5. HP
6. ATK
7. MAG
8. DEF
9. SPD
10. EXP
11. RIGHT
12. LEFT
13. HEAD
14. ARMOR
15. SHOES
16. ACCESSOR
17. position - mapping to **map**

### 装备 **equipment**

1. id
2. type
3. name
4. description
5. abilities
   1. equip - 装备时属性加成
   2. upload - 装备时触发效果
   3. download - 抛弃时触发效果

## 初始化逻辑模块

### 地图初始化

### 人物属性初始化

## 回合逻辑

### 启动阶段

input: **player**, **field**
output: **player**

### 移动阶段

input: **player**, **map** n,m from, **map** n,m to
output: **player**, **map** n,m

### 战斗阶段

### 结束阶段
