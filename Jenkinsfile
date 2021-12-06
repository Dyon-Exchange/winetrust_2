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
<<<<<<< HEAD

//pipeline {
//    agent {
//        docker {
//            image 'node:6-alpine'
//            args '-p 3000:3000'
//        }
//    }
//     environment {
//            CI = 'true'
//        }
//    stages {
//        stage('Build') {
//            steps {
//                sh 'npm --version'
//            }
//        }
//        stage('Test') {
//                    steps {
//                        sh './packages/react-app/package.json'
//                    }
//                }
//    }
//}


// pipeline {
//     agent {
//         docker {
//             image 'node:16-alpine'
//             args '-p 3000:3000'
//         }
//     }
// stages {
//     stage('Build') {
//         steps {
//             sh 'yarn install'
//         }
//     }
// }
// }
=======
>>>>>>> 777c9cadae1b69b5e2580088ffc959ea9148aaf9
