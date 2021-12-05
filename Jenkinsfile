pipeline {
    agent any
    tools {nodejs "node"}
    
    stages {
        stage('Build') {
            steps {
                git credentialsId: 'd6dfe1be-1cf9-4c0a-b1cb-6f109dd70761', url: 'git@github.com:Dyon-Exchange/winetrust_2.git'
                sh 'yarn install'
            }
        }
    }
}
