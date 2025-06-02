// 제품 등록 모듈
window.ProductRegister = {
    // 상태 변수
    postFiles: [],
    infoFiles: [],
    sendHistory: [],
    isTransferInProgress: false,
    
    // HTML 반환
    getHTML: function() {
        return `
            <div class="tabs">
                <button class="tab active" onclick="ProductRegister.switchTab(event, 'main')">메인</button>
                <button class="tab" onclick="ProductRegister.switchTab(event, 'history')">전송 기록</button>
            </div>

            <!-- 메인 탭 -->
            <div id="main" class="tab-content active">
                <!-- 1. 웹훅 URL 설정 -->
                <div class="section">
                    <h2>🔗 웹훅 URL 설정</h2>
                    <div class="form-group">
                        <label for="webhookUrl1">웹훅 1 - Airtable 데이터 전송:</label>
                        <div class="url-input-group">
                            <input type="text" id="webhookUrl1">
                            <button onclick="ProductRegister.saveWebhookUrl('webhookUrl1')">저장</button>
                        </div>
                        <span id="savedIndicator1" class="saved-indicator" style="display: none;">✅ 저장됨</span>
                    </div>
                    <div class="form-group">
                        <label for="webhookUrl2">웹훅 2 - Airtable → Buffer 전송:</label>
                        <div class="url-input-group">
                            <input type="text" id="webhookUrl2">
                            <button onclick="ProductRegister.saveWebhookUrl('webhookUrl2')">저장</button>
                        </div>
                        <span id="savedIndicator2" class="saved-indicator" style="display: none;">✅ 저장됨</span>
                    </div>
                </div>

                <!-- 2. 데이터 입력 -->
                <div class="section">
                    <h2>📝 데이터 입력</h2>
                    
                    <button class="clear-all" onclick="ProductRegister.clearAll()">🗑️ 전체 초기화</button>

                    <div class="form-group">
                        <label for="productName">제품명:</label>
                        <input type="text" id="productName" placeholder="예: 애플 에어팟 프로 3세대">
                    </div>

                    <div class="form-group">
                        <label for="productPrice">제품가격:</label>
                        <input type="text" id="productPrice" placeholder="예: 359,000원">
                    </div>

                    <div class="form-group">
                        <label for="productInfo">제품정보:</label>
                        <textarea id="productInfo" rows="10" placeholder="제품의 주요 특징과 기능을 설명해주세요"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="customerReview">고객리뷰:</label>
                        <textarea id="customerReview" rows="10" placeholder="고객들의 후기와 평가를 입력해주세요. 여러 리뷰가 있을 경우 줄바꿈으로 구분하세요.&#10;&#10;예:&#10;음질이 정말 깨끗하고 노이즈 캔슬링 성능이 뛰어나요.&#10;장시간 착용해도 편안합니다.&#10;배터리 지속시간도 만족스럽습니다."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="affiliateLink">구매링크:</label>
                        <textarea id="affiliateLink" rows="1" placeholder="구매 링크를 입력해주세요"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="affiliateNotice">대가성문구:</label>
                        <textarea id="affiliateNotice" rows="1" placeholder="어필리에이트 대가성 문구를 입력해 주세요."></textarea>
                    </div>

                    <div class="form-group">
                        <label>정보 이미지들 (최대 4개):</label>
                        <div class="file-upload-area">
                            <input type="file" id="infoFileInput" multiple accept="image/*" style="display: none;">
                            <button onclick="document.getElementById('infoFileInput').click()">정보 이미지들 선택</button>
                            <p>info-1.png, info-2.png, info-3.png, info-4.png 파일들을 업로드하세요</p>
                        </div>
                        <div id="infoFileList" class="file-list" style="display: none;"></div>
                    </div>

                    <div class="form-group">
                        <label>포스팅 이미지 (1개):</label>
                        <div class="file-upload-area">
                            <input type="file" id="postFileInput" accept="image/*" style="display: none;">
                            <button onclick="document.getElementById('postFileInput').click()">포스팅 이미지 선택</button>
                            <p>post.png 파일을 업로드하세요</p>
                        </div>
                        <div id="postFileList" class="file-list" style="display: none;"></div>
                    </div>
                </div>

                <!-- 3. 전송 -->
                <div class="section">
                    <h2>🚀 전송</h2>
                    <button id="sendButton" onclick="ProductRegister.startTransferProcess()">제품 정보 전송하기</button>
                    <div id="result"></div>
                </div>
            </div>

            <!-- 전송 기록 탭 -->
            <div id="history" class="tab-content">
                <div class="section">
                    <h2>📋 전송 기록</h2>
                    <button onclick="ProductRegister.displayHistory()">기록 새로고침</button>
                    <button class="secondary" onclick="ProductRegister.clearHistory()">기록 삭제</button>
                    <div id="historyList" style="margin-top: 15px;"></div>
                </div>
            </div>
        `;
    },
    
    // 초기화
    initialize: function() {
        this.loadSavedUrls();
        this.loadHistory();
        this.setupFileHandlers();
    },
    
    // 저장된 URL 로드
    loadSavedUrls: function() {
        const savedUrl1 = Utils.safeStorage.get('webhookUrl1', '');
        const savedUrl2 = Utils.safeStorage.get('webhookUrl2', '');
        
        if (savedUrl1) {
            document.getElementById('webhookUrl1').value = savedUrl1;
            this.showSavedIndicator('savedIndicator1');
        }
        if (savedUrl2) {
            document.getElementById('webhookUrl2').value = savedUrl2;
            this.showSavedIndicator('savedIndicator2');
        }
    },
    
    // 히스토리 로드
    loadHistory: function() {
        try {
            const historyData = Utils.safeStorage.get('webhookHistory', '[]');
            if (historyData !== '[]') {
                this.sendHistory = JSON.parse(historyData);
            }
        } catch (e) {
            console.log('히스토리 데이터 파싱 오류:', e);
            this.sendHistory = [];
        }
    },
    
    // 파일 핸들러 설정
    setupFileHandlers: function() {
        const postFileInput = document.getElementById('postFileInput');
        const infoFileInput = document.getElementById('infoFileInput');

        if (postFileInput) {
            postFileInput.addEventListener('change', (e) => {
                this.handlePostFiles(e.target.files);
            });
        }

        if (infoFileInput) {
            infoFileInput.addEventListener('change', (e) => {
                this.handleInfoFiles(e.target.files);
            });
        }
    },
    
    // 포스팅 파일 처리
    handlePostFiles: function(files) {
        if (files.length > 1) {
            this.addLogEntry('포스팅 이미지는 1개만 업로드할 수 있습니다.', 'error');
            return;
        }
        this.postFiles = Array.from(files);
        
        this.postFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                file.base64Data = e.target.result;
                this.updatePostFileList();
            };
            reader.readAsDataURL(file);
        });
    },
    
    // 정보 파일 처리
    handleInfoFiles: function(files) {
        if (files.length > 4) {
            this.addLogEntry('정보 이미지는 최대 4개까지 업로드할 수 있습니다.', 'error');
            return;
        }
        this.infoFiles = Array.from(files);
        
        this.infoFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                file.base64Data = e.target.result;
                this.updateInfoFileList();
            };
            reader.readAsDataURL(file);
        });
    },
    
    // 포스팅 파일 목록 업데이트
    updatePostFileList: function() {
        const fileList = document.getElementById('postFileList');
        if (!fileList) return;
        
        if (this.postFiles.length === 0) {
            fileList.style.display = 'none';
            return;
        }

        fileList.style.display = 'block';
        fileList.innerHTML = '';

        this.postFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name} (${Utils.formatFileSize(file.size)})</span>
                <button class="remove-file" onclick="ProductRegister.removePostFile(${index})">삭제</button>
            `;
            fileList.appendChild(fileItem);
        });
    },
    
    // 정보 파일 목록 업데이트
    updateInfoFileList: function() {
        const fileList = document.getElementById('infoFileList');
        if (!fileList) return;
        
        if (this.infoFiles.length === 0) {
            fileList.style.display = 'none';
            return;
        }

        fileList.style.display = 'block';
        fileList.innerHTML = '';

        this.infoFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name} (${Utils.formatFileSize(file.size)})</span>
                <button class="remove-file" onclick="ProductRegister.removeInfoFile(${index})">삭제</button>
            `;
            fileList.appendChild(fileItem);
        });
    },
    
    // 파일 삭제
    removePostFile: function(index) {
        this.postFiles.splice(index, 1);
        this.updatePostFileList();
    },
    
    removeInfoFile: function(index) {
        this.infoFiles.splice(index, 1);
        this.updateInfoFileList();
    },
    
    // 웹훅 URL 저장
    saveWebhookUrl: function(urlFieldId) {
        const url = document.getElementById(urlFieldId).value.trim();
        const indicatorId = urlFieldId.replace('webhookUrl', 'savedIndicator');
        
        if (url) {
            Utils.safeStorage.set(urlFieldId, url);
            this.showSavedIndicator(indicatorId);
            this.addLogEntry(`${this.getWebhookLabel(urlFieldId)} URL이 저장되었습니다.`, 'success');
        } else {
            this.addLogEntry(`${this.getWebhookLabel(urlFieldId)} URL을 입력해주세요.`, 'error');
        }
    },
    
    // 저장 표시기 표시
    showSavedIndicator: function(indicatorId) {
        const indicator = document.getElementById(indicatorId);
        if (indicator) {
            indicator.style.display = 'inline';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 3000);
        }
    },
    
    // 웹훅 레이블 가져오기
    getWebhookLabel: function(urlFieldId) {
        return urlFieldId === 'webhookUrl1' ? '웹훅 1 (Airtable)' : '웹훅 2 (Buffer)';
    },
    
    // 탭 전환
    switchTab: function(event, tabName) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        if (tabName === 'history') {
            this.cleanupOldHistory();
            this.displayHistory();
        }
    },
    
    // 로그 출력
    addLogEntry: function(message, type) {
        const resultDiv = document.getElementById('result');
        const timestamp = new Date().toLocaleTimeString('ko-KR');
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        
        logEntry.innerHTML = `
            <div class="log-timestamp">[${timestamp}]</div>
            <div>${message.replace(/\n/g, '<br>')}</div>
        `;
        
        resultDiv.appendChild(logEntry);
        resultDiv.scrollTop = resultDiv.scrollHeight;
    },
    
    // 로그 영역 초기화
    clearLogArea: function() {
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
    },
    
    // 전체 초기화
    clearAll: function() {
        this.clearAllFields();
        this.clearLogArea();
        this.addLogEntry('전체 초기화가 완료되었습니다.', 'info');
    },
    
    // 필드 초기화
    clearAllFields: function() {
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productInfo').value = '';
        document.getElementById('customerReview').value = '';
        document.getElementById('affiliateLink').value = '';
        document.getElementById('affiliateNotice').value = '';
        this.postFiles = [];
        this.infoFiles = [];
        this.updatePostFileList();
        this.updateInfoFileList();
    },
    
    // 메시지 내용 생성
    buildMessageContent: function() {
        const productName = document.getElementById('productName').value.trim();
        const productPrice = document.getElementById('productPrice').value.trim();
        const productInfo = document.getElementById('productInfo').value.trim();
        const customerReview = document.getElementById('customerReview').value.trim();
        const affiliateLink = document.getElementById('affiliateLink').value.trim();
        const affiliateNotice = document.getElementById('affiliateNotice').value.trim();
        
        // 빈 필드도 포함하여 모든 필드를 항상 전송
        let content = '';
        content += `[제품명]${productName}\n`;
        content += `[제품가격]${productPrice}\n`;
        content += `[제품정보]${productInfo}\n`;
        content += `[고객리뷰]${customerReview}\n`;
        content += `[구매링크]${affiliateLink}\n`;
        content += `[대가성문구]${affiliateNotice}\n`;
        
        return content.trim();
    },
    
    // 필드 비활성화/활성화
    toggleFormFields: function(disabled) {
        const fields = [
            'productName', 'productPrice', 'productInfo', 
            'customerReview', 'affiliateLink', 'affiliateNotice'
        ];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.disabled = disabled;
            }
        });

        // 파일 업로드 버튼들도 비활성화
        const fileButtons = document.querySelectorAll('.file-upload-area button');
        fileButtons.forEach(button => {
            button.disabled = disabled;
        });

        // 전송 버튼 상태 변경
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.disabled = disabled;
            if (disabled) {
                sendButton.innerHTML = '<span class="button-loading"></span>전송 중...';
            } else {
                sendButton.innerHTML = '제품 정보 전송하기';
            }
        }
    },
    
    // 전송 프로세스 시작
    startTransferProcess: function() {
        if (this.isTransferInProgress) {
            this.addLogEntry('이미 전송이 진행 중입니다. 잠시만 기다려주세요.', 'error');
            return;
        }

        const url1 = document.getElementById('webhookUrl1').value.trim();
        const url2 = document.getElementById('webhookUrl2').value.trim();
        
        if (!url1) {
            this.addLogEntry('웹훅 1 (Airtable) URL을 입력하고 저장해주세요.', 'error');
            return;
        }

        if (!url2) {
            this.addLogEntry('웹훅 2 (Buffer) URL을 입력하고 저장해주세요.', 'error');
            return;
        }

        this.isTransferInProgress = true;
        this.toggleFormFields(true);

        this.addLogEntry('전송 프로세스 시작...', 'info');
        this.sendWebhook('webhookUrl1');
    },
    
    // 웹훅 1 전송
    sendWebhook: function(urlFieldId) {
        const url = document.getElementById(urlFieldId).value.trim();
        const content = this.buildMessageContent();
        
        if (!url) {
            this.ad
