# Shopify CSV导入功能使用指南

## 功能概述

管理后台新增了Shopify CSV批量导入功能，支持从Shopify导出的CSV文件快速导入商品数据。

---

## 访问路径

1. 登录管理后台: `/admin/login`
2. 进入导入页面: `/admin/import`
3. 或从侧边栏点击 "Import Products"

---

## 使用步骤

### 步骤1: 上传CSV文件

**方式1: 拖拽上传**
- 将CSV文件拖拽到上传区域
- 系统自动识别文件

**方式2: 点击选择**
- 点击"选择文件"按钮
- 从文件浏览器选择CSV文件

**支持的文件格式:**
- 文件扩展名: `.csv`
- 编码: UTF-8
- 分隔符: 逗号(,)

### 步骤2: 预览数据

系统会自动解析CSV文件并显示:
- 商品总数
- 前10条商品预览
- 商品图片、名称、价格、类型、标签

**检查要点:**
- [ ] 商品名称是否正确
- [ ] 价格是否准确
- [ ] 图片链接是否有效
- [ ] 标签是否正确识别

### 步骤3: 确认导入

- 点击"确认导入"按钮
- 等待导入完成（请勿关闭页面）
- 查看导入结果

---

## CSV格式要求

### 必需列（Shopify标准格式）

| 列名 | 说明 | 示例 |
|------|------|------|
| Handle | 商品唯一标识 | `lace-bra-001` |
| Title | 商品名称 | `Elegant Lace Bra` |
| Body (HTML) | 商品描述 | `Beautiful lace bra...` |
| Vendor | 品牌/供应商 | `Intimate Elegance` |
| Type | 商品类型 | `Bras` |
| Tags | 标签（逗号分隔） | `New,Featured` |
| Variant Price | 销售价格 | `49.99` |
| Variant Compare At Price | 原价（可选） | `69.99` |
| Image Src | 图片URL | `https://...` |

### 标签识别规则

系统会自动识别以下标签并转换为徽章:
- `New` → New徽章（金棕色）
- `Sale` → Sale徽章（红色）
- `Bestseller` → Bestseller徽章（金黄色）

---

## CSV模板示例

```csv
Handle,Title,Body (HTML),Vendor,Type,Tags,Variant Price,Variant Compare At Price,Image Src
lace-bra-001,Elegant Lace Bra,Beautiful lace bra with delicate details,Intimate Elegance,Bras,New,49.99,69.99,https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f
silk-chemise-002,Silk Chemise,Luxurious silk chemise,Intimate Elegance,Chemises,Bestseller,89.99,,https://images.unsplash.com/photo-1596783074918-c84cb06531ca
satin-bodysuit-003,Satin Bodysuit,Elegant satin bodysuit,Intimate Elegance,Bodysuits,Sale,59.99,79.99,https://images.unsplash.com/photo-1583846112476-f5e88c4e9e3f
```

### 下载模板

在导入页面点击"下载CSV模板文件"按钮，获取标准格式的模板文件。

---

## 从Shopify导出CSV

### 在Shopify后台:

1. 进入 **Products** 页面
2. 点击 **Export** 按钮
3. 选择导出选项:
   - Export: All products
   - Export as: CSV for Excel, Numbers, or other spreadsheet programs
4. 点击 **Export products**
5. 下载生成的CSV文件

### 导出的CSV可以直接导入

Shopify导出的CSV文件格式与本系统兼容，可以直接导入使用。

---

## 数据映射

系统会自动将Shopify CSV字段映射到商品数据:

| Shopify字段 | 系统字段 | 说明 |
|------------|---------|------|
| Title | name | 商品名称 |
| Body (HTML) | description | 商品描述 |
| Variant Price | price | 销售价格 |
| Variant Compare At Price | originalPrice | 原价（划线价） |
| Image Src | image | 商品主图 |
| Type | type | 商品类型 |
| Vendor | vendor | 品牌 |
| Tags | badge/tags | 标签和徽章 |

---

## 常见问题

### Q: 支持哪些图片格式？
A: 支持所有通过URL访问的图片，建议使用:
- JPG/JPEG
- PNG
- WebP
- 图片URL必须是公开可访问的

### Q: 价格格式要求？
A: 
- 使用数字格式，不要包含货币符号
- 正确: `49.99`
- 错误: `$49.99` 或 `49.99元`

### Q: 如何处理多个标签？
A: 使用逗号分隔多个标签:
```
Tags: New,Featured,Summer Collection
```

### Q: 导入后可以修改吗？
A: 可以，导入后可以在商品管理页面编辑或删除商品。

### Q: 支持批量更新吗？
A: 目前支持批量导入新商品。如需更新现有商品，请先删除再重新导入。

### Q: 最大支持多少商品？
A: 建议单次导入不超过1000个商品，以确保最佳性能。

### Q: 导入失败怎么办？
A: 检查以下几点:
1. CSV文件格式是否正确
2. 必需字段是否完整
3. 价格是否为有效数字
4. 图片URL是否可访问

---

## 最佳实践

### 1. 准备数据
- 确保所有必需字段都有值
- 检查价格格式
- 验证图片URL可访问
- 统一商品类型命名

### 2. 测试导入
- 先用少量数据测试（5-10个商品）
- 确认数据正确后再批量导入
- 检查导入后的商品显示

### 3. 数据备份
- 导入前备份现有商品数据
- 保存原始CSV文件
- 记录导入时间和数量

### 4. 图片优化
- 使用CDN托管图片
- 推荐尺寸: 800x1000px
- 压缩图片以提高加载速度

---

## 技术说明

### 支持的CSV编码
- UTF-8 (推荐)
- UTF-8 with BOM
- ASCII

### 解析规则
- 第一行作为表头
- 空行自动跳过
- 引号内的逗号不作为分隔符
- 自动去除字段前后空格

### 数据验证
- 价格必须为有效数字
- 商品名称不能为空
- 图片URL格式验证

---

## 示例场景

### 场景1: 新店铺初始化
1. 在Shopify准备好商品数据
2. 导出CSV文件
3. 直接导入到本系统
4. 快速完成商品上架

### 场景2: 季节性商品更新
1. 准备新季商品CSV
2. 添加"New"标签
3. 批量导入
4. 自动显示New徽章

### 场景3: 促销活动
1. 更新商品价格
2. 添加"Sale"标签
3. 设置原价和促销价
4. 导入更新

---

## 技术支持

如遇到问题，请检查:
1. CSV文件格式
2. 浏览器控制台错误信息
3. 网络连接状态

---

**最后更新**: 2026-01-27
**版本**: 1.0.0
