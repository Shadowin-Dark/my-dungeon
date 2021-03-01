# 数据层设计文档

## 实体

### 地块 - **field**

1. id
2. name - 地块名称
3. sideEffect - 地块效果，函数集
   1. movestart
      1. input: **user**
      2. output: **user**
   2. movein
      1. input: **user**
      2. output: **user**
   3. moveout
      1. input: **user**
      2. output: **user**
   4. battle
      1. input: **user**,**monster**
      2. output: **user**,**monster**
   5. moveend
      1. input: **user**
      2. output: **user**
4. **monster**
5. **user**
6. description
7. \*logo
8. \*image

### 地图 - **map**

1. array for N\*M
   1. **field**
   2. status
2. 额外信息

### 怪物 - **monster**

1. ATK
2. HP
3. array for abilities
   1. battle
   2. demage
   3. defense
4. deathcall

### 玩家 **user**

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
17. location - mapping to **map**

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

input: **user**, **field**
output: **user**

### 移动阶段

input: **user**, **map** n,m from, **map** n,m to
output: **user**, **map** n,m

### 战斗阶段

### 结束阶段
