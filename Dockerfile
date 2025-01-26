# Node.js 기반 이미지 사용 (최신 LTS 버전)
FROM node:18-alpine

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일만 복사 (의존성 설치를 위한 package.json)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 소스 코드 복사 (이 부분은 호스트에서 마운트로 대체 가능)
COPY . .

# 포트 노출 (프론트엔드와 백엔드)
EXPOSE 3000
EXPOSE 5000

# 기본 명령어 설정
CMD ["npm", "run", "dev"]

# 1. Dockerfile에 변경이 있을 때
# 2. 의존성이 변경되었을 때:
# 3. 완전히 새로운 이미지를 만들고 싶을 때:
# → 소스코드만 변경된 경우, 호스트 디렉토리에서 파일을 마운트한 경우는 실행 안해도 됨.
#podman build -t sslist:dev .

# 컨테이너 실행
# podman run -it --rm -v C:\ssProject\ssList:/app -w /app -p 3000:3000 -p 5000:5000 node:18-alpine sh -c "npm install --save-dev nodemon react-scripts && npm install && npm run dev"


#podman run -it --rm \
#  -v $(pwd):/app \                   # 현재 폴더를 컨테이너의 /app에 마운트
#  -w /app \                          # 작업 디렉토리를 /app으로 설정
#  -p 3000:3000 \                     # 프론트엔드 포트 매핑
#  -p 5000:5000 \                     # 백엔드 포트 매핑
#  node:18-alpine sh -c "npm install --save-dev nodemon react-scripts && npm install && npm run dev"