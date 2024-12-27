# DouYing

**都赢公司服务**

```
// 运行迁移数据库
// 数据库
npx sequelize-cli db:migrate

// seeds
// 指定的seeds
npx sequelize-cli db:seed --seed 20241102070134-seed-products.js

npx sequelize-cli db:seed:all --seeders-path ./seeds_pro

```

## 数据库表单

### 用户表 (`user`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ---------------- |
| `id`                 | `UUID`                | 唯一标识符          | 0.0.1           | 是               |
| `username`           | `STRING(100)`         | 用户名              | 0.0.1           | 是               |
| `name`               | `STRING(100)`         | 姓名                | 0.0.1           | 是               |
| `roleId`             | `INT`                 | 角色 ID             | 0.0.1           | 是               |
| `phone`              | `STRING(100)`         | 手机号码            | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是               |
| `loginAttempts`      | `INT`                 | 登录尝试次数（0-5） | 0.0.1           | 是               |
| `lockUntil`          | `DATETIME`            | 锁定时间            | 0.0.1           |                  |
| `is_active`          | `BOOLEAN`             | 账户是否激活        | 0.0.1           |                  |

---

### 密码表 (`password`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是               |
| `userId`             | `UUID`                | 用户 ID             | 0.0.1           | 是               |
| `originalPassword`   | `VARCHAR`             | 原始密码            | 0.0.1           |                  |
| `password`           | `VARCHAR`             | 密码（加密存储）    | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 密码创建时间        | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是               |

---

### 权限表 (`role`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符（级别）  | 0.0.1           | 是               |
| `roleName`           | `STRING(100)`         | 权限类型            | 0.0.1           | 是               |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是               |

---

### 公司表 (`company`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是               |
| `companyName`        | `STRING(100)`         | 公司名称            | 0.0.1           | 是               |
| `contactPerson`      | `STRING(100)`         | 联系人              | 0.0.1           | 是               |
| `contactPhone`       | `STRING(100)`         | 联系人电话          | 0.0.1           |                  |
| `address`            | `VARCHAR`             | 地址                | 0.0.1           | 是               |
| `detailedAddress`    | `VARCHAR`             | 详细地址            | 0.0.1           | 是               |
| `areaCode`           | `STRING(50)`          | 区域代码            | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除            | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间            | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是               |

---

### 员工表 (`employee`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | ---------------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                         | 0.0.1           | 是               |
| `employeeNumber`     | `STRING(50)`          | 员工编号                           | 0.0.1           | 是               |
| `name`               | `STRING(100)`         | 姓名                               | 0.0.1           | 是               |
| `gender`             | `ENUM('M', 'F', 'O')` | 详情：[性别类型](#employee_gender) | 0.0.1           |                  |
| `phone`              | `STRING(100)`         | 联系电话                           | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 创建时间                           | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间                       | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                           | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                           | 0.0.1           |                  |

- <a id="employee_gender"></a> `gender` 字段的 ENUM 值：`ENUM('M', 'F', 'O')`
  - `M`: 男
  - `F`: 女
  - `O`: 其他

---

### 仓库表 (`warehouse`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）               | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | --------------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                        | 0.0.1           | 是               |
| `warehouseName`      | `STRING(100)`         | 仓库名称                          | 0.0.1           | 是               |
| `address`            | `VARCHAR`             | 地址                              | 0.0.1           | 是               |
| `detailedAddress`    | `VARCHAR`             | 详细地址                          | 0.0.1           | 是               |
| `areaCode`           | `STRING(50)`          | 区域代码                          | 0.0.1           | 是               |
| `type`               | `ENUM('P', 'R', 'O')` | 详情：[仓库类型](#warehouse_type) | 0.0.1           | 是               |
| `capacity`           | `DECIMAL(10, 3)`      | 仓库容量（默认 999999）           | 0.0.1           |                  |
| `unit`               | `STRING(50)`          | 单位 (KG, ton，箱)                | 0.0.1           | 是               |
| `createdAt`          | `DATETIME`            | 创建时间                          | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间                      | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                          | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                          | 0.0.1           |                  |

- <a id="warehouse_type"></a> `type` 字段的 ENUM 值：`ENUM('P', 'R', 'O')`
  - `P`: 产品
  - `R`: 原料
  - `O`: 其他

---

### 生产表 (`producing`) ✅

| 字段名（Field Name） | 数据类型（Data Type）           | 描述（Description）               | 版本（Version） | 必填（Required） |
| -------------------- | ------------------------------- | --------------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                           | 生产记录的唯一标识符              | 0.0.1           | 是               |
| `productionBatch`    | `STRING(100)`                   | 生产批次编号，用于标识生产批次    | 0.0.1           | 是               |
| `batchSequence`      | `INT`                           | 生产批次号，用于第几批次          | 0.0.1           | 是               |
| `type`               | `ENUM`：[表末](#producing_type) | 详情：[生产类型](#producing_type) | 0.0.1           | 是               |
| `operator`           | `UUID`                          | 操作人员（外键，关联 `User` 表）  | 0.0.1           | 是               |
| `operatorName`       | `STRING(100)`                   | 操作人员名称                      | 0.0.1           | 是               |
| `completionTime`     | `DATETIME`                      | 生产任务完成时间                  | 0.0.1           |                  |
| `remark`             | `TEXT`                          | 备注信息                          | 0.0.1           |                  |
| `createdAt`          | `DATETIME`                      | 记录创建时间                      | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`                      | 记录最后更新时间                  | 0.0.1           | 是               |

- <a id="producing_type"></a> `type` 字段的 ENUM 值：`ENUM('PREPARING', 'PROCESSING', 'COMPLETED','RESTART','CLOSE','DELETE','O')`
  - `PREPARING`: 预备
  - `PROCESSING`: 生产中
  - `COMPLETED`: 已完成
  - `RESTART`: 重启
  - `CLOSE`: 关闭
  - `DELETE`: 删除
  - `O`: 其他

---

### 原料表 (`rawMaterial`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是               |
| `materialName`       | `STRING(100)`         | 原料名称                    | 0.0.1           | 是               |
| `companyId`          | `INT`                 | 供应商 ID                   | 0.0.1           |                  |
| `unit`               | `STRING(50)`          | 单位 (KG, TON)              | 0.0.1           | 是               |
| `computeUnit`        | `DECIMAL(10, 3)`      | 计算单位 (KG=>1，ton=>1000) | 0.0.1           | 是               |
| `remark`             | `TEXT`                | 备注                        | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                  |

---

### 原料仓库表 (`rawMaterialWarehouse`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                    | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | -------------------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                             | 0.0.1           | 是               |
| `warehouseId`        | `INT`                 | 仓库 ID（外键，关联 `warehouse` 表）   | 0.0.1           | 是               |
| `rawMaterialId`      | `INT`                 | 原料 ID（外键，关联 `rawMaterial` 表） | 0.0.1           | 是               |
| `quantity`           | `DECIMAL(10, 3)`      | 存储的原料数量                         | 0.0.1           | 是               |
| `unit`               | `STRING(50)`          | 单位（KG, ton）                        | 0.0.1           | 是               |
| `computeUnit`        | `DECIMAL(10, 3)`      | 计算单位 (KG=>1，ton=>1000)            | 0.0.1           | 是               |
| `createdAt`          | `DATETIME`            | 记录创建时间                           | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 记录最后更新时间                       | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                               | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                               | 0.0.1           |                  |

---

# 出入原料库记录表 (`inboundRecord`) ✅

| 字段名（Field Name）     | 数据类型（Data Type）         | 描述（Description）                      | 版本（Version） | 必填（Required） |
| ------------------------ | ----------------------------- | ---------------------------------------- | --------------- | ---------------- |
| `id`                     | `INT`                         | 唯一标识符                               | 0.0.1           | 是               |
| `rawMaterialWarehouseId` | `INT`                         | 原料仓库 ID（`rawMaterialWarehouse` 表） | 0.0.1           | 是               |
| `cost`                   | `DECIMAL(10, 2)`              | 原料成本                                 | 0.0.1           |                  |
| `dock`                   | `DECIMAL(10, 2)`              | 原料扣成                                 | 0.0.1           |                  |
| `quantity`               | `DECIMAL(10, 3)`              | 存储的原料数量                           | 0.0.1           | 是               |
| `unit`                   | `STRING(50)`                  | 单位（KG, ton）                          | 0.0.1           | 是               |
| `computeUnit`            | `DECIMAL(10, 3)`              | 计算单位 (KG=>1，ton=>1000)              | 0.0.1           | 是               |
| `beforeQuantity`         | `DECIMAL(10, 3)`              | 存储前的原料数量                         | 0.0.1           | 是               |
| `beforeUnit`             | `STRING(50)`                  | 存储前的单位（KG, ton）                  | 0.0.1           | 是               |
| `beforeComputeUnit`      | `DECIMAL(10, 3)`              | 存储前的计算单位 (KG=>1，ton=>1000)      | 0.0.1           | 是               |
| `afterQuantity`          | `DECIMAL(10, 3)`              | 存储后的原料数量                         | 0.0.1           | 是               |
| `afterUnit`              | `STRING(50)`                  | 存储后的单位（KG, ton）                  | 0.0.1           | 是               |
| `afterComputeUnit`       | `DECIMAL(10, 3)`              | 存储后的计算单位 (KG=>1，ton=>1000)      | 0.0.1           | 是               |
| `type`                   | `ENUM`：[表末](#inbound_type) | 详情：[变更枚举](#inbound_type)          | 0.0.1           | 是               |
| `operator`               | `UUID`                        | 操作人员（外键，关联 `User` 表）         | 0.0.1           | 是               |
| `operatorName`           | `STRING(100)`                 | 操作人员名称                             | 0.0.1           | 是               |
| `remark`                 | `TEXT`                        | 备注                                     | 0.0.1           |                  |
| `createdAt`              | `DATETIME`                    | 记录创建时间                             | 0.0.1           | 是               |
| `updatedAt`              | `DATETIME`                    | 记录最后更新时间                         | 0.0.1           | 是               |

- <a id="inbound_type"></a> `type` 字段的 ENUM 值：`ENUM('IN', 'OUT','COMPLETED', 'SUPPLEMENT', 'WITHDRAWAL'，'O')`

- `IN`: 入库
- `OUT`: 出库
- `COMPLETED`: 已完成
- `SUPPLEMENT`: 补充
- `WITHDRAWAL`: 回撤
- `O`: 其他

---

### 产品表 (`product`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是               |
| `productName`        | `STRING(100)`         | 产品名称                    | 0.0.1           | 是               |
| `specification`      | `STRING(50)`          | 产品规格                    | 0.0.1           | 是               |
| `companyId`          | `INT`                 | 供货公司 ID                 | 0.0.1           |                  |
| `unit`               | `STRING(50)`          | 单位 (12.5KG/箱)            | 0.0.1           | 是               |
| `computeUnit`        | `DECIMAL(10, 3)`      | 计算单位 (12.5KG/箱=》12.5) | 0.0.1           | 是               |
| `remark`             | `TEXT`                | 备注                        | 0.0.1           |                  |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                  |

---

### 产品仓库表 (`productWarehouse`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 必填（Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是               |
| `productId`          | `INT`                 | 产品 ID（关联产品表）       | 0.0.1           | 是               |
| `warehouseId`        | `INT`                 | 仓库 ID（关联仓库表）       | 0.0.1           | 是               |
| `quantity`           | `DECIMAL(10, 3)`      | 存储的原料数量              | 0.0.1           | 是               |
| `unit`               | `STRING(50)`          | 单位（(12.5KG/箱)           | 0.0.1           | 是               |
| `computeUnit`        | `DECIMAL(10, 3)`      | 计算单位 (12.5KG/箱=》12.5) | 0.0.1           | 是               |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是               |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                  |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                  |

---

### 产品库存记录表 (`productInventoryRecord`)

| 字段名（Field Name） | 数据类型（Data Type）           | 描述（Description）                                 | 版本（Version） | 必填（Required） |
| -------------------- | ------------------------------- | --------------------------------------------------- | --------------- | ---------------- |
| `id`                 | `INT`                           | 唯一标识符                                          | 0.0.1           | 是               |
| `productWarehouseId` | `INT`                           | 原料仓库记录 ID（外键，关联 `productWarehouse` 表） | 0.0.1           | 是               |
| `type`               | `ENUM`：[表末](#inventory_type) | 详情：[变更枚举](#inventory_type)                   | 0.0.1           | 是               |
| `cost`               | `DECIMAL(10, 2)`                | 存储的原料成本                                      | 0.0.1           |                  |
| `quantity`           | `DECIMAL(10, 3)`                | 存储的原料数量                                      | 0.0.1           | 是               |
| `unit`               | `STRING(50)`                    | 单位（(12.5KG/箱)                                   | 0.0.1           | 是               |
| `computeUnit`        | `DECIMAL(10, 3)`                | 计算单位 (12.5KG/箱=》12.5)                         | 0.0.1           | 是               |
| `beforeQuantity`     | `DECIMAL(10, 3)`                | 存储前的原料数量                                    | 0.0.1           | 是               |
| `beforeUnit`         | `STRING(50)`                    | 存储前的单位（KG, ton）                             | 0.0.1           | 是               |
| `beforeComputeUnit`  | `DECIMAL(10, 3)`                | 存储前的计算单位 (KG=>1，ton=>1000)                 | 0.0.1           | 是               |
| `afterQuantity`      | `DECIMAL(10, 3)`                | 存储后的原料数量                                    | 0.0.1           | 是               |
| `afterUnit`          | `STRING(50)`                    | 存储后的单位（KG, ton）                             | 0.0.1           | 是               |
| `afterComputeUnit`   | `DECIMAL(10, 3)`                | 存储后的计算单位 (KG=>1，ton=>1000)                 | 0.0.1           | 是               |
| `transactionDate`    | `DATETIME`                      | 操作日期                                            | 0.0.1           | 是               |
| `operator`           | `UUID`                          | 操作人员（外键，关联 `User` 表）                    | 0.0.1           | 是               |
| `operatorName`       | `STRING(100)`                   | 操作人员名称                                        | 0.0.1           | 是               |
| `remark`             | `TEXT`                          | 备注信息                                            | 0.0.1           |                  |
| `createdAt`          | `DATETIME`                      | 创建时间                                            | 0.0.1           | 是               |
| `updatedAt`          | `DATETIME`                      | 最后更新时间                                        | 0.0.1           | 是               |

- <a id="inventory_type"></a> `type` 字段的 ENUM 值：`ENUM('IN', 'OUT','MOVING_IN', 'MOVING_OUT', 'SUPPLEMENT', 'WITHDRAWAL'，'O')`

- `IN`: 入库
- `OUT`: 出库
- `MOVING_IN`: 迁入
- `MOVING_OUT`: 迁出
- `SUPPLEMENT`: 补充
- `WITHDRAWAL`: 回撤
- `O`: 其他

---

**注意：** 所有表格中的 `createdAt` 和 `updatedAt` 字段用于跟踪记录的创建和更新时间。

---
