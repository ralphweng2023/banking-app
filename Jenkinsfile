pipeline {
    agent any

    tools {
        nodejs 'NodeJs 22'
    }

    environment {
        SONARQUBE_ENV = 'Local SonarQube'
    }

    stages {

        // Stage 1: Install Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        // Stage 2: Build
        stage('Build') {
            steps {
                echo 'Building the TypeScript project...'
                sh 'npm run build'
            }
        }

        // Stage 3: Unit Testing
        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm run test:unit'
            }
        }

        // Stage 4: Integration Testing
        stage('Integration Tests') {
            steps {
                echo 'Running integration tests...'
                sh 'npm run test:integration'
            }
        }

        // Stage 5: Code Quality Analysis
        stage('Code Quality') {
            steps {
                echo 'Running SonarQube analysis with Dockerized SonarScanner...'
                sh '''
                docker run --rm \
                  -e SONAR_HOST_URL=http://192.168.0.167:9000 \
                  -e SONAR_LOGIN=sqp_b6962d6afbe312f3f248606006709e433a6f3f64 \
                  -v $(pwd):/usr/src \
                  sonarsource/sonar-scanner-cli:latest \
                  sonar-scanner \
                  -Dsonar.projectKey=my-bank \
                  -Dsonar.sources=/usr/src
                '''
            }
        }

        // Stage 6: Deploy
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Replace with your actual deployment step
                sh 'docker-compose up -d'  // Example if using Docker Compose
            }
        }
    }

    // Post-build actions (Optional)
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs() // Cleans up the workspace after the build
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
