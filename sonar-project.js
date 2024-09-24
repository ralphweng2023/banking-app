const { default: sonarqubeScanner } = require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl: 'http://192.168.0.167:9000',
        options: {
            'sonar.projectKey': 'my-bank',
            'sonar.sources': '.',
            'sonar.login': 'sqp_b6962d6afbe312f3f248606006709e433a6f3f64',
        },
    },
    () => {
        console.log('SonarQube scan completed');
    }
);
