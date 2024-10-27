# DouYing

**都赢公司服务**

## 数据库表单

### 用户表 (`user`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `username`           | `VARCHAR`             | 用户名              | 0.0.1           | 是                      |
| `name`               | `VARCHAR`             | 姓名                | 0.0.1           | 是                      |
| `roleId`             | `VARCHAR`             | 角色 ID             | 0.0.1           | 是                      |
| `phone`              | `VARCHAR`             | 手机号码            | 0.0.1           |                         |
| `created_at`         | `DATETIME`            | 账户创建时间        | 0.0.1           |                         |
| `updated_at`         | `DATETIME`            | 最后更新时间        | 0.0.1           |                         |
| `is_active`          | `BOOLEAN`             | 账户是否激活        | 0.0.1           |                         |

---

### 密码表 (`password`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `userId`             | `VARCHAR`             | 用户 ID             | 0.0.1           | 是                      |
| `originalPassword`   | `VARCHAR`             | 原始密码            | 0.0.1           |                         |
| `password`           | `VARCHAR`             | 密码（加密存储）    | 0.0.1           | 是                      |
| `created_at`         | `DATETIME`            | 密码创建时间        | 0.0.1           | 是                      |
| `updated_at`         | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |

---

### 权限表 (`role`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符（级别）  | 0.0.1           | 是                      |
| `roleName`           | `VARCHAR`             | 权限类型            | 0.0.1           | 是                      |
| `created_at`         | `DATETIME`            | 账户创建时间        | 0.0.1           |                         |
| `updated_at`         | `DATETIME`            | 最后更新时间        | 0.0.1           |                         |

---

### 公司表 (`company`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `companyName`        | `VARCHAR`             | 公司名称            | 0.0.1           | 是                      |
| `contactPerson`      | `VARCHAR`             | 联系人              | 0.0.1           |                         |
| `contactPhone`       | `VARCHAR`             | 联系人电话          | 0.0.1           |                         |
| `address`            | `VARCHAR`             | 地址                | 0.0.1           |                         |
| `detailedAddress`    | `VARCHAR`             | 详细地址            | 0.0.1           |                         |
| `areaCode`           | `VARCHAR`             | 区域代码            | 0.0.2           |                         |
| `isDeleted`          | `BOOLEAN`             | 是否删除            | 0.0.2           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间            | 0.0.2           |                         |

---

### 员工表 (`employee`)

| 字段名（Field Name） | 数据类型（Data Type） | 描述（Description） | 版本（Version） | 是否必填（Is Required） |
| -------------------- | --------------------- | ------------------- | --------------- | ----------------------- |
| `id`                 | `INT`                 | 唯一标识符          | 0.0.1           | 是                      |
| `employeeNumber`     | `VARCHAR`             | 员工编号            | 0.0.1           | 是                      |
| `name`               | `VARCHAR`             | 姓名                | 0.0.1           | 是                      |
| `gender`             | `ENUM('M', 'F', 'O')` | 性别                | 0.0.1           |                         |
| `phone`              | `VARCHAR`             | 联系电话            | 0.0.1           |                         |
| `created_at`         | `DATETIME`            | 创建时间            | 0.0.1           | 是                      |
| `updated_at`         | `DATETIME`            | 最后更新时间        | 0.0.1           | 是                      |
| `isDeleted`          | `BOOLEAN`             | 是否删除            | 0.0.2           |                         |
| `deletedAt`          | `DATETIME`            | 删除时间            | 0.0.2           |                         |

---

**注意：** 所有表格中的 `created_at` 和 `updated_at` 字段用于跟踪记录的创建和更新时间。

---
