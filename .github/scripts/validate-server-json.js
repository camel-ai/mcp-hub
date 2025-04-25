const fs = require('fs');
const path = require('path');

// 定义所有服务器JSON文件必须包含的字段
const requiredFields = ['name', 'key', 'description', 'command', 'homepage'];

function validateJsonFile(filePath, requiredFieldsList) {
    console.log(`Validating ${filePath}...`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        if (!Array.isArray(jsonData)) {
            console.error(`Error: ${filePath} should contain an array of server objects`);
            process.exit(1);
        }

        let hasErrors = false;

        jsonData.forEach((server, index) => {
            const missingFields = [];

            requiredFieldsList.forEach(field => {
                if (!server.hasOwnProperty(field) || server[field] === null || server[field] === undefined || server[field] === '') {
                    missingFields.push(field);
                }
            });

            if (missingFields.length > 0) {
                console.error(`Error in ${filePath}, server at index ${index} (${server.name || 'unnamed'}):`);
                console.error(`  Missing required fields: ${missingFields.join(', ')}`);
                hasErrors = true;
            }

            if (server.hasOwnProperty('args') && !Array.isArray(server.args)) {
                console.error(`Error in ${filePath}, server at index ${index} (${server.name || 'unnamed'}):`);
                console.error(`  Field 'args' must be an array`);
                hasErrors = true;
            }

            if (server.hasOwnProperty('env') && (typeof server.env !== 'object' || Array.isArray(server.env) || server.env === null)) {
                console.error(`Error in ${filePath}, server at index ${index} (${server.name || 'unnamed'}):`);
                console.error(`  Field 'env' must be an object`);
                hasErrors = true;
            }
        });

        if (hasErrors) {
            process.exit(1);
        } else {
            console.log(`${filePath} is valid!`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
        process.exit(1);
    }
}

// 验证 public/servers/ 目录下的所有JSON文件
const rootDir = process.cwd();
const serversDir = path.join(rootDir, 'public', 'servers');

// 检查目录是否存在
if (!fs.existsSync(serversDir)) {
    console.error(`Error: Directory ${serversDir} does not exist`);
    process.exit(1);
}

// 获取目录中的所有JSON文件
let jsonFiles = [];

function findJsonFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 递归遍历子目录
            findJsonFiles(filePath);
        } else if (file.endsWith('.json')) {
            // 添加JSON文件到列表
            jsonFiles.push(filePath);
        }
    });
}

// 开始搜索JSON文件
findJsonFiles(serversDir);

if (jsonFiles.length === 0) {
    console.warn(`Warning: No JSON files found in ${serversDir}`);
    process.exit(0);
}

// 验证每个JSON文件
let hasErrors = false;

jsonFiles.forEach(jsonFile => {
    try {
        validateJsonFile(jsonFile, requiredFields);
    } catch (error) {
        hasErrors = true;
    }
});

if (hasErrors) {
    process.exit(1);
} else {
    console.log('All validations completed successfully!');
}
