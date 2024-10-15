# DouYing

**都赢公司服务**

## 数据库表单

### 用户表 (`user`)

| 字段名       | 数据类型   | 描述         |
| ------------ | ---------- | ------------ |
| `id`         | `INT`      | 唯一标识符   |
| `username`   | `VARCHAR`  | 用户名       |
| `name`       | `VARCHAR`  | 姓名         |
| `roleId`     | `VARCHAR`  | 角色 ID      |
| `phone`      | `VARCHAR`  | 手机号码     |
| `created_at` | `DATETIME` | 账户创建时间 |
| `updated_at` | `DATETIME` | 最后更新时间 |
| `is_active`  | `BOOLEAN`  | 账户是否激活 |

---

### 密码表 (`password`)

| 字段名             | 数据类型   | 描述             |
| ------------------ | ---------- | ---------------- |
| `id`               | `INT`      | 唯一标识符       |
| `userId`              | `VARCHAR`  | 用户 ID          |
| `originalPassword` | `VARCHAR`  | 原始密码         |
| `password`         | `VARCHAR`  | 密码（加密存储） |
| `created_at`       | `DATETIME` | 密码创建时间     |
| `updated_at`       | `DATETIME` | 最后更新时间     |

---

### 权限表 (`role`)

| 字段名       | 数据类型   | 描述               |
| ------------ | ---------- | ------------------ |
| `id`         | `INT`      | 唯一标识符（级别） |
| `roleName`   | `VARCHAR`  | 权限类型           |
| `created_at` | `DATETIME` | 账户创建时间       |
| `updated_at` | `DATETIME` | 最后更新时间       |

---

### 公司表 (`company`)

| 字段名            | 数据类型  | 描述       |
| ----------------- | --------- | ---------- |
| `id`              | `INT`     | 唯一标识符 |
| `companyName`     | `VARCHAR` | 公司名称   |
| `contactPerson`   | `VARCHAR` | 联系人     |
| `contactPhone`    | `VARCHAR` | 联系人电话 |
| `address`         | `VARCHAR` | 地址       |
| `detailedAddress` | `VARCHAR` | 详细地址   |

---

**注意：** 所有表格中的 `created_at` 和 `updated_at` 字段用于跟踪记录的创建和更新时间。

---
