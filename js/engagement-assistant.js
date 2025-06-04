// 인게이지먼트 어시스턴트 모듈 - UI 수정 완료
window.EngagementAssistant = {
    // 현재 선택된 계정 변수
    currentSelectedAccount: null,

    // HTML 반환 - 완전히 새로 작성
    getHTML: function() {
        const mode = AppState.currentMode;
        
        return `
            <div class="section">
                <h2>📈 SNS 성장 도우미 (${mode.toUpperCase()} 모드)</h2>

                ${mode === 'pro' ? `
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3>💎 Pro 모드 기능</h3>
                        <ul>
                            <li>✅ AI 기반 맞춤 목표 설정</li>
                            <li>✅ Buffer Analytics 연동</li>
                            <li>✅ ManyChat Analytics 연동</li>
                            <li>✅ 실시간 성과 분석</li>
                        </ul>
                    </div>
                ` : ''}

                <!-- 일일 목표 섹션 -->
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="margin: 0;">🎯 오늘의 목표</h2>
                    </div>
                    
                    <!-- 메인 레이아웃: 왼쪽 목표 현황 + 오른쪽 계정 관리 -->
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; min-height: 300px;">
                        
                        <!-- 왼쪽: 선택된 계정 목표 현황 -->
                        <div style="background: white; padding: 25px; border-radius: 10px; border: 2px solid #667eea; position: relative;">
                            <!-- 상단 정보 -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <div style="color: #666; font-size: 20px; font-weight: bold;">2024.06.03</div>
                                <div style="font-size: 1.2em; color: #667eea;">
                                    <strong>총 진행률:</strong> <span id="overallProgress" style="font-size: 1.3em; color: #333;">0%</span>
                                </div>
                            </div>
                            
                            <!-- 계정명 -->
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h3 style="margin: 0; font-size: 1.8em; color: #333;">
                                    <span id="selectedAccountName">계정을 선택하세요</span>
                                </h3>
                            </div>
                            
                            <!-- 목표 리스트와 진행률 바 -->
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                                <!-- 왼쪽: 목표 리스트 -->
                                <div style="flex: 1;">
                                    <!-- 포스팅 -->
                                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                        <div style="width: 80px; font-size: 1.2em; color: #666; font-weight: bold;">포스팅</div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <button onclick="EngagementAssistant.updateCurrentGoal('posts', -1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">-</button>
                                            <span style="display: flex; align-items: center; min-width: 80px; justify-content: center;">
                                                <span id="current-posts" style="font-size: 1.6em; font-weight: bold; color: #333;">0</span>
                                                <span style="color: #666; font-size: 1.2em; margin: 0 8px;"> / </span>
                                                <span id="current-posts-target" style="font-size: 1.2em; color: #666;">0</span>
                                            </span>
                                            <button onclick="EngagementAssistant.updateCurrentGoal('posts', 1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">+</button>
                                        </div>
                                    </div>
                                    
                                    <!-- 좋아요 -->
                                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                        <div style="width: 80px; font-size: 1.2em; color: #666; font-weight: bold;">좋아요</div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <button onclick="EngagementAssistant.updateCurrentGoal('likes', -1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">-</button>
                                            <span style="display: flex; align-items: center; min-width: 80px; justify-content: center;">
                                                <span id="current-likes" style="font-size: 1.6em; font-weight: bold; color: #333;">0</span>
                                                <span style="color: #666; font-size: 1.2em; margin: 0 8px;"> / </span>
                                                <span id="current-likes-target" style="font-size: 1.2em; color: #666;">0</span>
                                            </span>
                                            <button onclick="EngagementAssistant.updateCurrentGoal('likes', 1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">+</button>
                                        </div>
                                    </div>
                                    
                                    <!-- 댓글 -->
                                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                        <div style="width: 80px; font-size: 1.2em; color: #666; font-weight: bold;">댓글</div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <button onclick="EngagementAssistant.updateCurrentGoal('comments', -1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">-</button>
                                            <span style="display: flex; align-items: center; min-width: 80px; justify-content: center;">
                                                <span id="current-comments" style="font-size: 1.6em; font-weight: bold; color: #333;">0</span>
                                                <span style="color: #666; font-size: 1.2em; margin: 0 8px;"> / </span>
                                                <span id="current-comments-target" style="font-size: 1.2em; color: #666;">0</span>
                                            </span>
                                            <button onclick="EngagementAssistant.updateCurrentGoal('comments', 1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">+</button>
                                        </div>
                                    </div>
                                    
                                    <!-- 팔로우 -->
                                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                        <div style="width: 80px; font-size: 1.2em; color: #666; font-weight: bold;">팔로우</div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <button onclick="EngagementAssistant.updateCurrentGoal('follows', -1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">-</button>
                                            <span style="display: flex; align-items: center; min-width: 80px; justify-content: center;">
                                                <span id="current-follows" style="font-size: 1.6em; font-weight: bold; color: #333;">0</span>
                                                <span style="color: #666; font-size: 1.2em; margin: 0 8px;"> / </span>
                                                <span id="current-follows-target" style="font-size: 1.2em; color: #666;">0</span>
                                            </span>
                                            <button onclick="EngagementAssistant.updateCurrentGoal('follows', 1)" 
                                                    style="width: 35px; height: 35px; font-size: 16px; border-radius: 50%; background: #667eea; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">+</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- 오른쪽: 진행률 바와 캐릭터 -->
                                <div style="display: flex; align-items: center; gap: 20px; margin-left: 40px;">
                                    <div style="width: 40px; height: 250px; background: #e9ecef; border-radius: 20px; position: relative; border: 3px solid #dee2e6;">
                                        <div id="verticalProgress" style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(0deg, #667eea, #764ba2); border-radius: 17px; transition: height 0.3s ease; height: 0%;"></div>
                                    </div>
                                    <div id="progressCharacter" style="font-size: 4em;">😴</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 오른쪽: 계정 관리 -->
                        <div style="background: white; padding: 25px; border-radius: 10px; border: 2px solid #28a745;">
                            <h3 style="margin: 0 0 20px 0; text-align: center; font-size: 1.4em;">⚙️ 계정 관리</h3>
                            
                            <!-- SNS 선택 -->
                            <div style="margin-bottom: 15px;">
                                <label for="snsSelect" style="display: block; font-size: 14px; margin-bottom: 8px; font-weight: bold;">SNS 플랫폼:</label>
                                <select id="snsSelect" style="width: 100%; padding: 10px; font-size: 14px; border: 2px solid #e1e5e9; border-radius: 8px;">
                                    <option value="instagram">Instagram</option>
                                    <option value="x">X (Twitter)</option>
                                    <option value="threads">Threads</option>
                                </select>
                            </div>
                            
                            <!-- 국가 선택 -->
                            <div style="margin-bottom: 20px;">
                                <label for="languageSelect" style="display: block; font-size: 14px; margin-bottom: 8px; font-weight: bold;">국가:</label>
                                <select id="languageSelect" style="width: 100%; padding: 10px; font-size: 14px; border: 2px solid #e1e5e9; border-radius: 8px;">
                                    <option value="korea">한국</option>
                                    <option value="japan">일본</option>
                                    <option value="usa">미국</option>
                                    <option value="canada">캐나다</option>
                                </select>
                            </div>
                            
                            <!-- 추가/제거 버튼 -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                                <button onclick="EngagementAssistant.addAccount()" 
                                        style="background: #28a745; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer;">➕ 추가</button>
                                <button onclick="EngagementAssistant.removeAccount()" 
                                        style="background: #dc3545; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer;">➖ 제거</button>
                            </div>
                            
                            <!-- 계정 목록 -->
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; font-size: 14px; margin-bottom: 8px; font-weight: bold;">활성 계정 목록:</label>
                                <select id="accountList" size="4" onchange="EngagementAssistant.selectAccount()" 
                                        style="width: 100%; padding: 8px; font-size: 13px; border: 2px solid #e1e5e9; border-radius: 8px; background: white;">
                                    <!-- 동적으로 채워짐 -->
                                </select>
                            </div>
                            
                            <div style="text-align: center;">
                                <button onclick="EngagementAssistant.saveAccountList()" 
                                        style="background: #667eea; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: bold; cursor: pointer;">💾 목록 저장</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 번역 어시스턴트 섹션 -->
                <div style="background: white; padding: 25px; border-radius: 10px; border: 2px solid #e1e5e9; margin-top: 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #667eea;">🔤 번역 어시스턴트</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <label for="commentInput" style="display: block; font-size: 16px; margin-bottom: 10px; font-weight: bold;">한국어 댓글 입력:</label>
                        <textarea id="commentInput" rows="3" placeholder="번역할 문장을 입력하세요" 
                                  style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 20px; align-items: end; margin-bottom: 20px;">
                        <div style="flex: 1;">
                            <label for="toneSelector" style="display: block; font-size: 16px; margin-bottom: 10px; font-weight: bold;">톤앤매너:</label>
                            <select id="toneSelector" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px;">
                                <option value="friendly">친근한</option>
                                <option value="polite">정중한</option>
                                <option value="casual">캐주얼</option>
                            </select>
                        </div>
                        <button onclick="EngagementAssistant.translateComment()" 
                                style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; height: fit-content;">번역하기</button>
                    </div>
                    
                    <div id="translationResult" style="margin-top: 20px;"></div>
                </div>
            </div>
        `;
    },

    // 초기화
    initialize: function() {
        this.checkMidnightReset();
        this.restoreGoalsState();
        this.initializeAccountList();
        AppState.templates = this.templates;
    },

    // 현재 계정 목표 업데이트 - 수정된 버전
    updateCurrentGoal: function(type, change) {
        if (!this.currentSelectedAccount) {
            Utils.showAchievement('계정을 먼저 선택해주세요.', 'error');
            return;
        }
        
        const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
        const current = accountGoals[type];
        const target = accountGoals.targets[type];
        const newValue = Math.max(0, Math.min(target, current + change));
        
        // 값 업데이트
        accountGoals[type] = newValue;
        
        // UI 업데이트
        const currentElement = document.getElementById(`current-${type}`);
        if (currentElement) {
            currentElement.textContent = newValue;
        }
        
        // 진행률 업데이트
        this.updateCurrentProgress();
        
        // 목표 달성 체크
        if (newValue === target) {
            Utils.showAchievement(`${this.currentSelectedAccount} ${type} 목표 달성! 🎉`);
        }
        
        AppState.saveAppState();
    },

    // 현재 계정 진행률 업데이트 - 수정된 버전
    updateCurrentProgress: function() {
        if (!this.currentSelectedAccount) {
            this.updateProgressCharacter(0);
            const overallElement = document.getElementById('overallProgress');
            if (overallElement) {
                overallElement.textContent = '0%';
            }
            return;
        }
        
        const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
        const totalCurrent = accountGoals.posts + accountGoals.likes + accountGoals.comments + accountGoals.follows;
        const totalTarget = accountGoals.targets.posts + accountGoals.targets.likes + accountGoals.targets.comments + accountGoals.targets.follows;
        const percentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
        
        // 진행률 캐릭터 업데이트
        this.updateProgressCharacter(percentage);
        
        // 총 진행률 업데이트
        const overallElement = document.getElementById('overallProgress');
        if (overallElement) {
            overallElement.textContent = `${Math.round(percentage)}%`;
        }
    },

    // 진행률 캐릭터 업데이트 - 수정된 버전
    updateProgressCharacter: function(percentage) {
        const characterElement = document.getElementById('progressCharacter');
        const verticalProgress = document.getElementById('verticalProgress');
        
        if (!characterElement || !verticalProgress) {
            console.log('UI 요소를 찾을 수 없습니다:', { 
                characterElement: !!characterElement, 
                verticalProgress: !!verticalProgress 
            });
            return;
        }
        
        // 세로 진행률 바 업데이트
        verticalProgress.style.height = `${Math.round(percentage)}%`;
        
        // 진행률에 따른 캐릭터와 색상 변경
        let character = '😴';
        let bgColor = 'linear-gradient(0deg, #6c757d, #495057)';
        
        if (percentage >= 100) {
            character = '🎉';
            bgColor = 'linear-gradient(0deg, #28a745, #20c997)';
        } else if (percentage >= 75) {
            character = '🤩';
            bgColor = 'linear-gradient(0deg, #28a745, #20c997)';
        } else if (percentage >= 50) {
            character = '😊';
            bgColor = 'linear-gradient(0deg, #ffc107, #fd7e14)';
        } else if (percentage >= 25) {
            character = '🙂';
            bgColor = 'linear-gradient(0deg, #667eea, #764ba2)';
        } else if (percentage > 0) {
            character = '😐';
            bgColor = 'linear-gradient(0deg, #6c757d, #495057)';
        }
        
        characterElement.textContent = character;
        verticalProgress.style.background = bgColor;
        
        console.log(`진행률 업데이트: ${percentage}%, 캐릭터: ${character}`);
    },

    // 계정 선택
    selectAccount: function() {
        const accountList = document.getElementById('accountList');
        const selectedOption = accountList.options[accountList.selectedIndex];
        
        if (selectedOption) {
            this.currentSelectedAccount = selectedOption.value;
            this.updateCurrentAccountDisplay();
            this.updateCurrentProgress();
        }
    },

    // 현재 계정 표시 업데이트
    updateCurrentAccountDisplay: function() {
        if (!this.currentSelectedAccount) {
            document.getElementById('selectedAccountName').textContent = '계정을 선택하세요';
            return;
        }
        
        const [sns, language] = this.currentSelectedAccount.split('-');
        const displayName = this.getAccountDisplayName(sns, language);
        document.getElementById('selectedAccountName').textContent = displayName;
        
        // 해당 계정의 목표 데이터 가져오기
        const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
        
        // UI 업데이트
        document.getElementById('current-posts').textContent = accountGoals.posts;
        document.getElementById('current-posts-target').textContent = accountGoals.targets.posts;
        document.getElementById('current-likes').textContent = accountGoals.likes;
        document.getElementById('current-likes-target').textContent = accountGoals.targets.likes;
        document.getElementById('current-comments').textContent = accountGoals.comments;
        document.getElementById('current-comments-target').textContent = accountGoals.targets.comments;
        document.getElementById('current-follows').textContent = accountGoals.follows;
        document.getElementById('current-follows-target').textContent = accountGoals.targets.follows;
        
        this.updateCurrentProgress();
    },

    // 나머지 함수들은 기존과 동일하므로 생략...
    // (계정 관리, 번역, 초기화 등의 함수들은 기존 코드 유지)

    // 계정별 목표 가져오기
    getAccountGoals: function(accountKey) {
        if (!AppState.accountGoals) {
            AppState.accountGoals = {};
        }
        
        if (!AppState.accountGoals[accountKey]) {
            const [sns, language] = accountKey.split('-');
            AppState.accountGoals[accountKey] = {
                posts: 0, likes: 0, comments: 0, follows: 0,
                targets: this.getDefaultTargets(sns, language)
            };
        }
        
        return AppState.accountGoals[accountKey];
    },

    // 기본 목표 설정
    getDefaultTargets: function(sns, language) {
        const baseTargets = {
            instagram: { posts: 1, likes: 5, comments: 2, follows: 1 },
            x: { posts: 2, likes: 3, comments: 1, follows: 1 },
            threads: { posts: 1, likes: 4, comments: 1, follows: 1 }
        };
        
        return baseTargets[sns] || { posts: 1, likes: 3, comments: 1, follows: 1 };
    },

    // 계정 목록 초기화
    initializeAccountList: function() {
        if (!AppState.accountList) {
            AppState.accountList = [
                'instagram-korea', 'instagram-japan', 'instagram-usa',
                'x-korea', 'x-japan', 'x-usa',
                'threads-korea', 'threads-japan', 'threads-usa'
            ];
        }
        this.updateAccountListDisplay();
    },

    // 계정 추가
    addAccount: function() {
        const sns = document.getElementById('snsSelect').value;
        const language = document.getElementById('languageSelect').value;
        const accountKey = `${sns}-${language}`;
        
        if (!AppState.accountList.includes(accountKey)) {
            AppState.accountList.push(accountKey);
            this.updateAccountListDisplay();
            AppState.saveAppState();
            Utils.showAchievement(`${this.getAccountDisplayName(sns, language)} 계정이 추가되었습니다!`);
        } else {
            Utils.showAchievement('이미 존재하는 계정입니다.', 'error');
        }
    },

    // 계정 제거
    removeAccount: function() {
        const accountList = document.getElementById('accountList');
        const selectedOption = accountList.options[accountList.selectedIndex];
        
        if (selectedOption) {
            const accountKey = selectedOption.value;
            const index = AppState.accountList.indexOf(accountKey);
            
            if (index > -1) {
                AppState.accountList.splice(index, 1);
                this.updateAccountListDisplay();
                AppState.saveAppState();
                Utils.showAchievement(`${selectedOption.text} 계정이 제거되었습니다!`);
            }
        } else {
            Utils.showAchievement('제거할 계정을 선택해주세요.', 'error');
        }
    },

    // 계정 목록 표시 업데이트
    updateAccountListDisplay: function() {
        const accountList = document.getElementById('accountList');
        if (!accountList) return;
        
        accountList.innerHTML = '';
        
        AppState.accountList.forEach(accountKey => {
            const [sns, language] = accountKey.split('-');
            const option = document.createElement('option');
            option.value = accountKey;
            option.textContent = this.getAccountDisplayName(sns, language);
            accountList.appendChild(option);
        });
    },

    // 계정 표시명 생성
    getAccountDisplayName: function(sns, language) {
        const snsNames = {
            instagram: 'Instagram',
            x: 'X',
            threads: 'Threads'
        };
        
        const languageNames = {
            korea: '한국',
            japan: '일본',
            usa: '미국',
            canada: '캐나다'
        };
        
        return `${snsNames[sns]} / ${languageNames[language]}`;
    },

    // 계정 목록 저장
    saveAccountList: function() {
        AppState.saveAppState();
        Utils.showAchievement('계정 목록이 저장되었습니다! 💾');
    },

    // 자정 리셋 체크
    checkMidnightReset: function() {
        const lastResetDate = Utils.safeStorage.get('lastResetDate', '');
        const today = new Date().toDateString();
        
        if (lastResetDate !== today) {
            this.resetAllGoals();
            Utils.safeStorage.set('lastResetDate', today);
            Utils.showAchievement('자정이 지나 목표가 자동으로 리셋되었습니다! 🌅');
        }
    },

    // 모든 목표 리셋
    resetAllGoals: function() {
        if (AppState.accountGoals) {
            Object.keys(AppState.accountGoals).forEach(accountKey => {
                AppState.accountGoals[accountKey].posts = 0;
                AppState.accountGoals[accountKey].likes = 0;
                AppState.accountGoals[accountKey].comments = 0;
                AppState.accountGoals[accountKey].follows = 0;
            });
        }
        
        // UI 업데이트
        if (this.currentSelectedAccount) {
            this.updateCurrentAccountDisplay();
        }
        
        AppState.saveAppState();
    },

    // 목표 상태 복원
    restoreGoalsState: function() {
        setTimeout(() => {
            if (this.currentSelectedAccount) {
                this.updateCurrentAccountDisplay();
            }
        }, 100);
    },

    // 번역 함수
    translateComment: function() {
        const input = document.getElementById('commentInput').value.trim();
        const tone = document.getElementById('toneSelector').value;
        const result = document.getElementById('translationResult');
        
        if (!input) {
            result.innerHTML = '<p style="color: #dc3545; padding: 15px; background: #f8d7da; border-radius: 8px;">번역할 텍스트를 입력해주세요.</p>';
            return;
        }
        
        // 로딩 표시
        result.innerHTML = '<p style="padding: 15px; background: #d1ecf1; border-radius: 8px; text-align: center;">번역 중... ⏳</p>';
        
        // GPT API 호출 (실제 구현에서는 여기서 API 호출)
        if (AppState.currentMode === 'pro') {
            this.callGPTTranslation(input, tone, result);
        } else {
            // Free 모드에서는 시뮬레이션
            setTimeout(() => {
                const translations = this.getSimulatedTranslation(input, tone);
                this.displayTranslationResult(input, translations, tone, result);
            }, 1000);
        }
    },

    // GPT API 호출 (Pro 모드)
    callGPTTranslation: function(input, tone, resultElement) {
        // 실제 구현에서는 여기서 GPT API 호출
        // 현재는 시뮬레이션으로 구현
        setTimeout(() => {
            const translations = this.getSimulatedTranslation(input, tone);
            this.displayTranslationResult(input, translations, tone, resultElement);
        }, 1500);
    },

    // 번역 결과 표시
    displayTranslationResult: function(original, translations, tone, resultElement) {
        resultElement.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 10px; border: 2px solid #e1e5e9;">
                <h4 style="margin: 0 0 20px 0; color: #667eea; font-size: 1.3em;">번역 결과 (${this.getToneName(tone)} 톤):</h4>
                
                <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                    <strong style="font-size: 1.1em;">🇰🇷 한국어:</strong><br>
                    <span style="font-size: 1.1em; margin-top: 5px; display: block;">${original}</span>
                </div>
                
                <div style="margin-bottom: 15px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1.1em;">🇯🇵 일본어:</strong><br>
                        <span style="font-size: 1.1em; margin-top: 5px; display: block;">${translations.japanese}</span>
                    </div>
                    <button onclick="Utils.copyText('${translations.japanese}')" 
                            style="background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; white-space: nowrap; margin-left: 15px;">복사</button>
                </div>
                
                <div style="margin-bottom: 20px; padding: 15px; background: #d1ecf1; border-radius: 8px; border-left: 4px solid #17a2b8; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1.1em;">🇫🇷 프랑스어:</strong><br>
                        <span style="font-size: 1.1em; margin-top: 5px; display: block;">${translations.french}</span>
                    </div>
                    <button onclick="Utils.copyText('${translations.french}')" 
                            style="background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; white-space: nowrap; margin-left: 15px;">복사</button>
                </div>
                
                <div style="padding: 15px; background: #e2e3e5; border-radius: 8px; font-size: 14px; line-height: 1.5;">
                    <strong>💡 사용 팁:</strong> 각 언어의 문화적 특성을 고려하여 번역했습니다. 복사 버튼을 클릭하여 바로 사용하세요!
                </div>
            </div>
        `;
    },

    // 톤 이름 변환
    getToneName: function(tone) {
        const names = {
            friendly: '친근한',
            polite: '정중한',
            casual: '캐주얼'
        };
        return names[tone] || tone;
    },

    // 시뮬레이션된 번역 결과
    getSimulatedTranslation: function(text, tone) {
        const translations = {
            friendly: {
                japanese: text.replace(/정말/g, "本当に").replace(/예쁘네요/g, "可愛いですね").replace(/어디서/g, "どこで").replace(/구매하셨나요/g, "購入されましたか") || "本当に素敵ですね！",
                french: text.replace(/정말/g, "vraiment").replace(/예쁘네요/g, "c'est joli").replace(/어디서/g, "où").replace(/구매하셨나요/g, "avez-vous acheté") || "C'est vraiment joli !"
            },
            polite: {
                japanese: text.replace(/정말/g, "とても").replace(/예쁘네요/g, "美しいですね").replace(/어디서/g, "どちらで").replace(/구매하셨나요/g, "お求めになりましたか") || "とても美しいですね。",
                french: text.replace(/정말/g, "très").replace(/예쁘네요/g, "c'est très élégant").replace(/어디서/g, "où").replace(/구매하셨나요/g, "avez-vous acquis") || "C'est très élégant."
            },
            casual: {
                japanese: text.replace(/정말/g, "マジで").replace(/예쁘네요/g, "可愛い！").replace(/어디서/g, "どこで").replace(/구매하셨나요/g, "買ったの？") || "マジで可愛い！",
                french: text.replace(/정말/g, "super").replace(/예쁘네요/g, "c'est mignon").replace(/어디서/g, "où").replace(/구매하셨나요/g, "tu l'as acheté où") || "C'est super mignon !"
            }
        };
        
        return translations[tone] || translations.friendly;
    }
};
