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

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `UUID`                | 唯一标识符          | 0.0.1           | 是                      |
| `username`           | `VARCHAR`             | 用户名              | 0.0.1           | 是                      |
| `name`               | `VARCHAR`             | 姓名                | 0.0.1           | 是                      |
| `roleId`             | `VARCHAR`             | 角色 ID             | 0.0.1           | 是                      |
| `phone`              | `VARCHAR`             | 手机号码            | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |
| `is_active`          | `BOOLEAN`             | 账户是否激活        | 0.0.1           |                         |

---

### 密码表 (`password`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `userId`             | `VARCHAR`             | 用户 ID             | 0.0.1           | 是                      |
| `originalPassword`   | `VARCHAR`             | 原始密码            | 0.0.1           |                         |
| `password`           | `VARCHAR`             | 密码（加密存储）    | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 密码创建时间        | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |

---

### 权限表 (`role`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符（级别）  | 0.0.1           | 是                      |
| `roleName`           | `VARCHAR`             | 权限类型            | 0.0.1           | 是                      |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |

---

### 公司表 (`company`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `companyName`        | `VARCHAR`             | 公司名称            | 0.0.1           | 是                      |
| `contactPerson`      | `VARCHAR`             | 联系人              | 0.0.1           | 是                      |
| `contactPhone`       | `VARCHAR`             | 联系人电话          | 0.0.1           |                         |
| `address`            | `VARCHAR`             | 地址                | 0.0.1           | 是                      |
| `detailedAddress`    | `VARCHAR`             | 详细地址            | 0.0.1           | 是                      |
| `areaCode`           | `VARCHAR`             | 区域代码            | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除            | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间            | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 账户创建时间        | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |

---

### 员工表 (`employee`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ---------------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                         | 0.0.1           | 是                      |
| `employeeNumber`     | `VARCHAR`             | 员工编号                           | 0.0.1           | 是                      |
| `name`               | `VARCHAR`             | 姓名                               | 0.0.1           | 是                      |
| `gender`             | `ENUM('M', 'F', 'O')` | 详情：[性别枚举](#employee_gender) | 0.0.1           |                         |
| `phone`              | `VARCHAR`             | 联系电话                           | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 创建时间                           | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                       | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                           | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                           | 0.0.1           |                         |

---

### 仓库表 (`warehouse`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ---------------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                         | 0.0.1           | 是                      |
| `warehouseName`      | `VARCHAR`             | 仓库名称                           | 0.0.1           | 是                      |
| `address`            | `VARCHAR`             | 地址                               | 0.0.1           | 是                      |
| `detailedAddress`    | `VARCHAR`             | 详细地址                           | 0.0.1           | 是                      |
| `areaCode`           | `VARCHAR`             | 区域代码                           | 0.0.1           | 是                      |
| `warehouseType`      | `ENUM('P', 'R', 'O')` | 仓库类型（p 产品，r 原料，o 其他） | 0.0.1           | 是                      |
| `capacity`           | `FLOAT`               | 仓库容量（默认 999999）            | 0.0.1           |                         |
| `unit`               | `VARCHAR`             | 单位 (KG, ton，箱)                 | 0.0.1           | 是                      |
| `createdAt`          | `DATETIME`            | 创建时间                           | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                       | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                           | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                           | 0.0.1           |                         |

---

### 生产表 (`producing`) ✅

| 字段名（Field Name） | 数据类型（Data Type）                                         | 描述（Description）                   | 版本（Version） | 是否必填（Is Required） |
| -------------------- | ------------------------------------------------------------- | ------------------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                                                         | 生产记录的唯一标识符                  | 0.0.1           | 是                      |
| `productionBatch`    | `VARCHAR`                                                     | 生产批次编号，用于标识生产批次        | 0.0.1           | 是                      |
| `type`               | `ENUM('PREPARING', 'PROCESSING', 'COMPLETED','RESTART', 'O')` | 详情：[生产类型枚举](#producing_type) | 0.0.1           | 是                      |
| `operator`           | `UUID`                                                        | 操作人员（外键，关联 `User` 表）      | 0.0.1           | 是                      |
| `operatorName`       | `VARCHAR`                                                     | 操作人员名称                          | 0.0.1           | 是                      |
| `completionTime`     | `DATETIME`                                                    | 生产任务完成时间                      | 0.0.1           |                         |
| `remarks`            | `TEXT`                                                        | 备注信息                              | 0.0.1           |                         |
| `createdAt`          | `DATETIME`                                                    | 记录创建时间                          | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`                                                    | 记录最后更新时间                      | 0.0.1           | 是                      |

---

### 原料表 (`rawMaterial`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是                      |
| `materialName`       | `VARCHAR`             | 原料名称                    | 0.0.1           | 是                      |
| `companyId`          | `INT`                 | 供应商 ID                   | 0.0.1           |                         |
| `unit`               | `VARCHAR`             | 单位 (KG, ton)              | 0.0.1           | 是                      |
| `computeUnit`        | `FLOAT`               | 计算单位 (KG=>1，ton=>1000) | 0.0.1           | 是                      |
| `remark`             | `VARCHAR`             | 备注                        | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                         |

---

### 原料仓库表 (`rawMaterialWarehouse`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                    | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | -------------------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                             | 0.0.1           | 是                      |
| `warehouseId`        | `INT`                 | 仓库 ID（外键，关联 `warehouse` 表）   | 0.0.1           | 是                      |
| `rawMaterialId`      | `INT`                 | 原料 ID（外键，关联 `rawMaterial` 表） | 0.0.1           | 是                      |
| `quantity`           | `FLOAT`               | 存储的原料数量                         | 0.0.1           | 是                      |
| `unit`               | `VARCHAR`             | 单位（KG, ton）                        | 0.0.1           | 是                      |
| `computeUnit`        | `FLOAT`               | 计算单位 (KG=>1，ton=>1000)            | 0.0.1           | 是                      |
| `createdAt`          | `DATETIME`            | 记录创建时间                           | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 记录最后更新时间                       | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                               | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                               | 0.0.1           |                         |

---

### 出入原料库记录表 (`inboundRecord`) ✅

| 字段名（Field Name）     | 数据类型（Data Type）                                         | 描述（Description）                                     | 版本（Version） | 是否必填（Is Required） |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------- | --------------- | ----------------------- |
| `id`                     | `INT`                                                         | 唯一标识符                                              | 0.0.1           | 是                      |
| `rawMaterialWarehouseId` | `INT`                                                         | 原料仓库记录 ID（外键，关联 `rawMaterialWarehouse` 表） | 0.0.1           | 是                      |
| `quantity`               | `FLOAT`                                                       | 存储的原料数量                                          | 0.0.1           | 是                      |
| `unit`                   | `VARCHAR`                                                     | 单位（KG, ton）                                         | 0.0.1           | 是                      |
| `computeUnit`            | `FLOAT`                                                       | 计算单位 (KG=>1，ton=>1000)                             | 0.0.1           | 是                      |
| `changeType`             | `ENUM('I', 'O','COMPLETED', 'SUPPLEMENT', 'WITHDRAWAL'，'O')` | 详情：[变更类型枚举](#inboundRecord_changeType)         | 0.0.1           | 是                      |
| `operator`               | `UUID`                                                        | 操作人员（外键，关联 `User` 表）                        | 0.0.1           | 是                      |
| `operatorName`           | `VARCHAR`                                                     | 操作人员名称                                            | 0.0.1           | 是                      |
| `remark`                 | `TEXT`                                                        | 备注                                                    | 0.0.1           |                         |
| `createdAt`              | `DATETIME`                                                    | 记录创建时间                                            | 0.0.1           | 是                      |
| `updatedAt`              | `DATETIME`                                                    | 记录最后更新时间                                        | 0.0.1           | 是                      |

---

### 产品表 (`product`) ✅

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是                      |
| `productName`        | `VARCHAR`             | 产品名称                    | 0.0.1           | 是                      |
| `specification`      | `VARCHAR`             | 产品规格                    | 0.0.1           | 是                      |
| `companyId`          | `INT`                 | 供货公司 ID                 | 0.0.1           |                         |
| `unit`               | `VARCHAR`             | 单位 (12.5KG/箱)            | 0.0.1           | 是                      |
| `computeUnit`        | `FLOAT`               | 计算单位 (12.5KG/箱=》12.5) | 0.0.1           | 是                      |
| `remark`             | `VARCHAR`             | 备注                        | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                         |

---

### 产品仓库表 (`productWarehouse`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）         | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | --------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                  | 0.0.1           | 是                      |
| `productId`          | `INT`                 | 产品 ID（关联产品表）       | 0.0.1           | 是                      |
| `warehouseId`        | `INT`                 | 仓库 ID（关联仓库表）       | 0.0.1           | 是                      |
| `quantity`           | `FLOAT`               | 存储的原料数量              | 0.0.1           | 是                      |
| `unit`               | `VARCHAR`             | 单位（(12.5KG/箱)           | 0.0.1           | 是                      |
| `computeUnit`        | `FLOAT`               | 计算单位 (12.5KG/箱=》12.5) | 0.0.1           | 是                      |
| `createdAt`          | `DATETIME`            | 创建时间                    | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除                    | 0.0.1           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间                    | 0.0.1           |                         |

---

### 产品库存记录表 (`productInventoryRecord`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description）                                 | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | --------------------------------------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符                                          | 0.0.1           | 是                      |
| `productWarehouseId` | `INT`                 | 原料仓库记录 ID（外键，关联 `productWarehouse` 表） | 0.0.1           | 是                      |
| `type`               | `ENUM('IN', 'OUT')`   | 操作类型：`IN` 表示入库，`OUT` 表示出库             | 0.0.1           | 是                      |
| `quantity`           | `FLOAT`               | 存储的原料数量                                      | 0.0.1           | 是                      |
| `unit`               | `VARCHAR`             | 单位（(12.5KG/箱)                                   | 0.0.1           | 是                      |
| `computeUnit`        | `FLOAT`               | 计算单位 (12.5KG/箱=》12.5)                         | 0.0.1           | 是                      |
| `transactionDate`    | `DATETIME`            | 操作日期                                            | 0.0.1           | 是                      |
| `operator`           | `UUID`                | 操作人员（外键，关联 `User` 表）                    | 0.0.1           | 是                      |
| `operatorName`       | `VARCHAR`             | 操作人员名称                                        | 0.0.1           | 是                      |
| `remarks`            | `TEXT`                | 备注信息                                            | 0.0.1           |                         |
| `createdAt`          | `DATETIME`            | 创建时间                                            | 0.0.1           | 是                      |
| `updatedAt`          | `DATETIME`            | 最后更新时间                                        | 0.0.1           | 是                      |

---

**注意：** 所有表格中的 `createdAt` 和 `updatedAt` 字段用于跟踪记录的创建和更新时间。

---

## ENUM 枚举类型

### <a id="employee_gender"></a> `employee表gender` 字段的 ENUM 值：

- `M`: 男
- `F`: 女
- `O`: 其他

### <a id="producing_type"></a> `producing表type` 字段的 ENUM 值：

- `PREPARING`: 预备
- `PROCESSING`: 生产中
- `COMPLETED`: 已完成
- `RESTART`: 重启
- `O`: 其他

### <a id="inboundRecord_changeType"></a> `inboundRecord表changeType` 字段的 ENUM 值：

- `IN`: 入库
- `OUT`: 出库
- `COMPLETED`: 已完成
- `SUPPLEMENT`: 补充
- `WITHDRAWAL`: 回撤
- `O`: 其他

---
