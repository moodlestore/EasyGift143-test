// 인게이지먼트 어시스턴트 모듈
window.EngagementAssistant = {
    // ... 다른 코드들 ...

    // HTML 반환 - 이 함수 전체를 교체하세요
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
<div class="section">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0;">🎯 오늘의 목표</h2>
    </div>
    
   <!-- 6:4 비율 레이아웃 (높이 30% 더 축소) -->
<div style="display: flex; gap: 20px; align-items: stretch; min-height: 108px;">
    <!-- 왼쪽 영역 (60%) - 선택된 계정 현황 -->
    <div style="flex: 6; background: white; padding: 20px; border-radius: 8px; border: 2px solid #667eea; display: flex; flex-direction: column; position: relative;">
        <!-- 좌측 상단: 날짜 -->
        <div style="position: absolute; top: 15px; left: 20px;">
            <div style="color: #666; font-size: 16px; font-weight: bold;">2024.06.03</div>
        </div>
        
        <!-- 우측 끝: 총 진행률 -->
        <div style="position: absolute; top: 15px; right: 20px; font-size: 1.1em; color: #667eea;">
            <strong>총 진행률:</strong> <span id="overallProgress" style="font-size: 1.2em; color: #333;">0%</span>
        </div>
        
        <!-- 상단 중앙: 계정명 (크기 키움) -->
        <div style="text-align: center; margin-top: 35px; margin-bottom: 15px;">
            <h3 style="margin: 0; font-size: 1.6em; color: #333;"><span id="selectedAccountName">계정을 선택하세요</span></h3>
        </div>
        
        <!-- 중앙: 목표 상세 (세로 배치, 가로형 컨트롤, 왼쪽 이동) -->
        <div style="position: absolute; top: 50%; left: 30%; transform: translate(-50%, -50%); display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; min-width: 250px;">
                <div style="font-size: 1.1em; color: #666; font-weight: bold; width: 60px;">좋아요</div>
                <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="EngagementAssistant.updateCurrentGoal('likes', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                    <span style="display: flex; align-items: center;">
                        <span id="current-likes" style="font-size: 1.3em; font-weight: bold;">0</span>
                        <span style="color: #666; font-size: 1.0em; margin: 0 4px;"> / </span>
                        <span id="current-likes-target" style="font-size: 1.1em;">0</span>
                    </span>
                    <button onclick="EngagementAssistant.updateCurrentGoal('likes', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; min-width: 250px;">
                <div style="font-size: 1.1em; color: #666; font-weight: bold; width: 60px;">댓글</div>
                <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="EngagementAssistant.updateCurrentGoal('comments', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                    <span style="display: flex; align-items: center;">
                        <span id="current-comments" style="font-size: 1.3em; font-weight: bold;">0</span>
                        <span style="color: #666; font-size: 1.0em; margin: 0 4px;"> / </span>
                        <span id="current-comments-target" style="font-size: 1.1em;">0</span>
                    </span>
                    <button onclick="EngagementAssistant.updateCurrentGoal('comments', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between; min-width: 250px;">
                <div style="font-size: 1.1em; color: #666; font-weight: bold; width: 60px;">팔로우</div>
                <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                    <button onclick="EngagementAssistant.updateCurrentGoal('follows', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                    <span style="display: flex; align-items: center;">
                        <span id="current-follows" style="font-size: 1.3em; font-weight: bold;">0</span>
                        <span style="color: #666; font-size: 1.0em; margin: 0 4px;"> / </span>
                        <span id="current-follows-target" style="font-size: 1.1em;">0</span>
                    </span>
                    <button onclick="EngagementAssistant.updateCurrentGoal('follows', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                </div>
            </div>
        </div>
        
        <!-- 우측: 캐릭터와 진행률 바 -->
        <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 15px;">
            <div style="width: 30px; height: 150px; background: #e9ecef; border-radius: 15px; position: relative; border: 2px solid #dee2e6;">
                <div id="verticalProgress" style="position: absolute; bottom: 0; width: 100%; background: #28a745; border-radius: 13px; transition: height 0.3s ease; height: 0%;"></div>
            </div>
            <div id="progressCharacter" style="font-size: 3.5em;">😴</div>
        </div>
    </div>
    
    <!-- 오른쪽 영역 (40%) - 계정 관리 (높이 30% 더 축소) -->
    <div style="flex: 4; background: white; padding: 20px; border-radius: 8px; border: 2px solid #28a745; display: flex; flex-direction: column; min-height: 68px;">
        
        <!-- SNS 선택 -->
        <div class="form-group" style="margin-bottom: 15px;">
            <label for="snsSelect" style="font-size: 14px; margin-bottom: 5px;">SNS 플랫폼:</label>
            <select id="snsSelect" style="padding: 10px; font-size: 14px;">
                <option value="instagram">Instagram</option>
                <option value="x">X (Twitter)</option>
                <option value="threads">Threads</option>
            </select>
        </div>
        
        <!-- 언어 선택 -->
        <div class="form-group" style="margin-bottom: 15px;">
            <label for="languageSelect" style="font-size: 14px; margin-bottom: 5px;">언어:</label>
            <select id="languageSelect" style="padding: 10px; font-size: 14px;">
                <option value="korean">한국어</option>
                <option value="japanese">일본어</option>
                <option value="french">프랑스어</option>
            </select>
        </div>
        
        <!-- 추가/제거 버튼 -->
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button onclick="EngagementAssistant.addAccount()" style="flex: 1; background: #28a745; font-size: 14px; padding: 10px;">➕ 추가</button>
            <button onclick="EngagementAssistant.removeAccount()" style="flex: 1; background: #dc3545; font-size: 14px; padding: 10px;">➖ 제거</button>
        </div>
        
        <!-- 계정 목록 -->
        <div style="margin-bottom: 10px;">
            <label style="font-size: 14px; margin-bottom: 5px;">활성 계정 목록:</label>
        </div>
        <select id="accountList" size="6" style="width: 100%; font-size: 14px; padding: 5px; flex: 1;" onchange="EngagementAssistant.selectAccount()">
            <!-- 동적으로 채워짐 -->
        </select>
        
        <div style="text-align: center; margin-top: 10px;">
            <button onclick="EngagementAssistant.saveAccountList()" style="background: #667eea; font-size: 12px; padding: 8px 12px;">💾 목록 저장</button>
        </div>
    </div>
</div>
                        
                <!-- 번역 어시스턴트 섹션 -->
                <div class="section">
                    <h2>🔤 번역 어시스턴트</h2>
                    <div class="form-group">
                        <label>한국어 댓글 입력:</label>
                        <textarea id="commentInput" rows="3" placeholder="번역할 댓글을 입력하세요"></textarea>
                    </div>
                    <div class="form-group">
                        <label>톤앤매너:</label>
                        <select id="toneSelector">
                            <option value="friendly">친근한</option>
                            <option value="polite">정중한</option>
                            <option value="casual">캐주얼</option>
                        </select>
                    </div>
                    <button onclick="EngagementAssistant.translateComment()">3개 언어로 번역하기</button>
                    <div id="translationResult" style="margin-top: 15px;"></div>
                </div>
                
                <!-- 댓글 템플릿 섹션 -->
                <div class="section">
                    <h2>📝 댓글 템플릿</h2>
                    <div class="template-grid">
                        <button onclick="EngagementAssistant.loadTemplate('praise')" class="praise">👏 칭찬</button>
                        <button onclick="EngagementAssistant.loadTemplate('question')" class="question">❓ 질문</button>
                        <button onclick="EngagementAssistant.loadTemplate('empathy')" class="empathy">💭 공감</button>
                        <button onclick="EngagementAssistant.loadTemplate('recommendation')" class="recommendation">💡 추천</button>
                    </div>
                    <div id="templateResult" class="template-result"></div>
                </div>
            </div>
        `;
    },

    // 초기화
 initialize: function() {
    this.checkMidnightReset(); // 자정 리셋 체크
    this.restoreGoalsState();
    this.initializeAccountList();
    AppState.templates = this.templates; // 템플릿을 AppState에도 저장
},

    // 목표 업데이트
    updateGoal: function(lang, type, change) {
        const current = AppState.dailyGoals[lang][type];
        const target = AppState.dailyGoals[lang].targets[type];
        const newValue = Math.max(0, Math.min(target, current + change));
        
        AppState.dailyGoals[lang][type] = newValue;
        
        // UI 업데이트
        document.getElementById(`${lang}-${type}`).textContent = newValue;
        this.updateProgress(lang);
        this.updateOverallProgress();
        
        // 목표 달성 체크
        if (newValue === target) {
            Utils.showAchievement(`${lang} ${type} 목표 달성! 🎉`);
        }
        
        AppState.saveAppState();
    },

    // 언어별 진행률 업데이트
    updateProgress: function(lang) {
        const goals = AppState.dailyGoals[lang];
        const targets = goals.targets;
        
        const totalCurrent = goals.likes + goals.comments + goals.follows;
        const totalTarget = targets.likes + targets.comments + targets.follows;
        const percentage = (totalCurrent / totalTarget) * 100;
        
        document.getElementById(`${lang}-progress`).style.width = `${percentage}%`;
        
        // 완료 시 색상 변경
        const progressBar = document.getElementById(`${lang}-progress`);
        if (percentage >= 100) {
            progressBar.style.background = '#28a745';
        } else {
            progressBar.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
    },

    // 전체 진행률 업데이트
    updateOverallProgress: function() {
        const goals = AppState.dailyGoals;
        let totalCurrent = 0;
        let totalTarget = 0;
        
        Object.keys(goals).forEach(lang => {
            const langGoals = goals[lang];
            totalCurrent += langGoals.likes + langGoals.comments + langGoals.follows;
            totalTarget += langGoals.targets.likes + langGoals.targets.comments + langGoals.targets.follows;
        });
        
        const percentage = Math.round((totalCurrent / totalTarget) * 100);
        document.getElementById('overallProgress').textContent = `${percentage}%`;
        
        if (percentage >= 100) {
            Utils.showAchievement('🎉 모든 목표 달성! 오늘 정말 수고하셨습니다!');
        }
    },

    // 목표 초기화
    resetDailyGoals: function() {
        if (confirm('오늘의 목표를 초기화하시겠습니까?')) {
            Object.keys(AppState.dailyGoals).forEach(lang => {
                AppState.dailyGoals[lang].likes = 0;
                AppState.dailyGoals[lang].comments = 0;
                AppState.dailyGoals[lang].follows = 0;
            });
            
            this.restoreGoalsState();
            AppState.saveAppState();
            Utils.showAchievement('목표가 초기화되었습니다.');
        }
    },

    // 모든 목표 완료 (테스트용)
    completeAllGoals: function() {
        Object.keys(AppState.dailyGoals).forEach(lang => {
            const targets = AppState.dailyGoals[lang].targets;
            AppState.dailyGoals[lang].likes = targets.likes;
            AppState.dailyGoals[lang].comments = targets.comments;
            AppState.dailyGoals[lang].follows = targets.follows;
        });
        
        this.restoreGoalsState();
        AppState.saveAppState();
    },

    // 목표 상태 복원
    restoreGoalsState: function() {
    setTimeout(() => {
        // 전체 목표 복원
        ['likes', 'comments', 'follows'].forEach(type => {
            const element = document.getElementById(`total-${type}`);
            const targetElement = document.getElementById(`total-${type}-target`);
            if (element) {
                element.textContent = AppState.totalGoals[type];
            }
            if (targetElement) {
                targetElement.textContent = AppState.totalGoals.targets[type];
            }
        });
        this.updateTotalProgress();
    }, 100);
},

    // 번역 함수
    translateComment: function() {
        const input = document.getElementById('commentInput').value.trim();
        const tone = document.getElementById('toneSelector').value;
        const result = document.getElementById('translationResult');
        
        if (!input) {
            result.innerHTML = '<p style="color: #dc3545;">번역할 텍스트를 입력해주세요.</p>';
            return;
        }
        
        // 로딩 표시
        result.innerHTML = '<p>번역 중... ⏳</p>';
        
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
            <div class="translation-result">
                <h4>번역 결과 (${this.getToneName(tone)} 톤):</h4>
                <div class="translation-item translation-korean">
                    <strong>🇰🇷 한국어:</strong> ${original}
                </div>
                <div class="translation-item translation-japanese">
                    <strong>🇯🇵 일본어:</strong> ${translations.japanese} 
                    <button class="copy-btn" onclick="Utils.copyText('${translations.japanese}')">복사</button>
                </div>
                <div class="translation-item translation-french">
                    <strong>🇫🇷 프랑스어:</strong> ${translations.french} 
                    <button class="copy-btn" onclick="Utils.copyText('${translations.french}')">복사</button>
                </div>
                <div style="margin-top: 15px; padding: 10px; background: #e2e3e5; border-radius: 5px; font-size: 14px;">
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
    },

    // 템플릿 로드
    loadTemplate: function(category) {
        const templates = this.templates[category];
        const result = document.getElementById('templateResult');
        
        if (!templates) {
            result.innerHTML = '<p>템플릿을 찾을 수 없습니다.</p>';
            return;
        }
        
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        result.innerHTML = `
            <div style="background: white; padding: 15px; border-radius: 8px;">
                <h4>${this.getCategoryName(category)} 템플릿:</h4>
                <div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #667eea; font-size: 16px;">
                    "${randomTemplate}"
                </div>
                <div class="template-actions">
                    <button onclick="Utils.copyText('${randomTemplate}')">📋 복사하기</button>
                    <button onclick="EngagementAssistant.translateTemplateComment('${randomTemplate}')">🌐 번역하기</button>
                    <button onclick="EngagementAssistant.loadTemplate('${category}')">🔄 다른 템플릿</button>
                </div>
                
                <details style="margin-top: 15px;">
                    <summary style="cursor: pointer; font-weight: bold;">모든 ${this.getCategoryName(category)} 템플릿 보기</summary>
                    <div class="template-list">
                        ${templates.map(template => `
                            <div class="template-item">
                                <span>"${template}"</span>
                                <button onclick="Utils.copyText('${template}')" style="font-size: 12px; padding: 4px 8px;">복사</button>
                            </div>
                        `).join('')}
                    </div>
                </details>
            </div>
        `;
    },

    // 카테고리 이름 변환
    getCategoryName: function(category) {
        const names = {
            praise: '칭찬',
            question: '질문',
            empathy: '공감',
            recommendation: '추천'
        };
        return names[category] || category;
    },

    // 템플릿 댓글 번역
    translateTemplateComment: function(text) {
        document.getElementById('commentInput').value = text;
        this.translateComment();
        
        // 번역 섹션으로 스크롤
        document.querySelector('h2').scrollIntoView({ behavior: 'smooth' });
    },

    // 계정 목록 초기화
    initializeAccountList: function() {
    if (!AppState.accountList) {
        AppState.accountList = [
            'instagram-korean', 'instagram-japanese', 'instagram-french',
            'x-korean', 'x-japanese', 'x-french',
            'threads-korean', 'threads-japanese', 'threads-french'
        ];
    }
    this.updateAccountListDisplay();
},

// 전체 목표 업데이트
updateTotalGoal: function(type, change) {
    const current = AppState.totalGoals[type];
    const target = AppState.totalGoals.targets[type];
    const newValue = Math.max(0, Math.min(target, current + change));
    
    AppState.totalGoals[type] = newValue;
    
    // UI 업데이트
    document.getElementById(`total-${type}`).textContent = newValue;
    this.updateTotalProgress();
    
    // 목표 달성 체크
    if (newValue === target) {
        Utils.showAchievement(`전체 ${type} 목표 달성! 🎉`);
    }
    
    AppState.saveAppState();
},

// 전체 진행률 업데이트
updateTotalProgress: function() {
    const goals = AppState.totalGoals;
    const targets = goals.targets;
    
    const totalCurrent = goals.likes + goals.comments + goals.follows;
    const totalTarget = targets.likes + targets.comments + targets.follows;
    const percentage = (totalCurrent / totalTarget) * 100;
    
    document.getElementById('total-progress').style.width = `${percentage}%`;
    document.getElementById('overallProgress').textContent = `${Math.round(percentage)}%`;
    
    // 완료 시 색상 변경
    const progressBar = document.getElementById('total-progress');
    if (percentage >= 100) {
        progressBar.style.background = '#28a745';
        Utils.showAchievement('🎉 모든 목표 달성! 오늘 정말 수고하셨습니다!');
    } else {
        progressBar.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }
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
        korean: '한국어',
        japanese: '일본어',
        french: '프랑스어'
    };
    
    // 텍스트 정렬을 위해 고정 길이 문자열 사용
    const snsFormatted = snsNames[sns].padEnd(10, ' ');
    
    return `${snsFormatted} / ${languageNames[language]}`;
},
    // 현재 선택된 계정 변수
currentSelectedAccount: null,

// 계정 선택 함수
selectAccount: function() {
    const accountList = document.getElementById('accountList');
    const selectedOption = accountList.options[accountList.selectedIndex];
    
    if (selectedOption) {
        this.currentSelectedAccount = selectedOption.value;
        this.updateCurrentAccountDisplay();
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
    document.getElementById('current-likes').textContent = accountGoals.likes;
    document.getElementById('current-likes-target').textContent = accountGoals.targets.likes;
    document.getElementById('current-comments').textContent = accountGoals.comments;
    document.getElementById('current-comments-target').textContent = accountGoals.targets.comments;
    document.getElementById('current-follows').textContent = accountGoals.follows;
    document.getElementById('current-follows-target').textContent = accountGoals.targets.follows;
    
    this.updateCurrentProgress();
},

// 계정별 목표 가져오기
getAccountGoals: function(accountKey) {
    if (!AppState.accountGoals) {
        AppState.accountGoals = {};
    }
    
    if (!AppState.accountGoals[accountKey]) {
        // 기본 목표 설정 (계정별로 다르게 설정 가능)
        const [sns, language] = accountKey.split('-');
        AppState.accountGoals[accountKey] = {
            likes: 0, comments: 0, follows: 0,
            targets: this.getDefaultTargets(sns, language)
        };
    }
    
    return AppState.accountGoals[accountKey];
},

// 기본 목표 설정
getDefaultTargets: function(sns, language) {
    const baseTargets = {
        instagram: { likes: 5, comments: 2, follows: 1 },
        x: { likes: 3, comments: 1, follows: 1 },
        threads: { likes: 4, comments: 1, follows: 1 }
    };
    
    return baseTargets[sns] || { likes: 3, comments: 1, follows: 1 };
},

// 현재 계정 목표 업데이트
updateCurrentGoal: function(type, change) {
    if (!this.currentSelectedAccount) {
        Utils.showAchievement('계정을 먼저 선택해주세요.', 'error');
        return;
    }
    
    const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
    const current = accountGoals[type];
    const target = accountGoals.targets[type];
    const newValue = Math.max(0, Math.min(target, current + change));
    
    accountGoals[type] = newValue;
    
    // UI 업데이트
    document.getElementById(`current-${type}`).textContent = newValue;
    this.updateCurrentProgress();
    
    // 목표 달성 체크
    if (newValue === target) {
        Utils.showAchievement(`${this.currentSelectedAccount} ${type} 목표 달성! 🎉`);
    }
    
    AppState.saveAppState();
},

// 현재 계정 진행률 업데이트
updateCurrentProgress: function() {
    if (!this.currentSelectedAccount) {
        this.updateProgressCharacter(0);
        return;
    }
    
    const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
    const totalCurrent = accountGoals.likes + accountGoals.comments + accountGoals.follows;
    const totalTarget = accountGoals.targets.likes + accountGoals.targets.comments + accountGoals.targets.follows;
    const percentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
    
    // 캐릭터 및 세로 진행률 업데이트
    this.updateProgressCharacter(percentage);
    
    // 전체 진행률도 업데이트
    this.updateTotalProgress();
},

// 전체 진행률 업데이트 (수정)
updateTotalProgress: function() {
    let totalCurrent = 0;
    let totalTarget = 0;
    
    AppState.accountList.forEach(accountKey => {
        const accountGoals = this.getAccountGoals(accountKey);
        totalCurrent += accountGoals.likes + accountGoals.comments + accountGoals.follows;
        totalTarget += accountGoals.targets.likes + accountGoals.targets.comments + accountGoals.targets.follows;
    });
    
    const percentage = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
    document.getElementById('overallProgress').textContent = `${percentage}%`;
    
    if (percentage >= 100) {
        Utils.showAchievement('🎉 모든 목표 달성! 오늘 정말 수고하셨습니다!');
    }
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
    // 모든 계정 목표 리셋
    if (AppState.accountGoals) {
        Object.keys(AppState.accountGoals).forEach(accountKey => {
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
    // 진행률에 따른 캐릭터 업데이트
updateProgressCharacter: function(percentage) {
    const characterElement = document.getElementById('progressCharacter');
    const verticalProgress = document.getElementById('verticalProgress');
    
    if (!characterElement || !verticalProgress) return;
    
    // 세로 진행률 바 업데이트
    verticalProgress.style.height = `${percentage}%`;
    
    // 진행률에 따른 캐릭터 변경
    let character = '😴'; // 기본 (0%)
    
    if (percentage >= 100) {
        character = '🎉'; // 완료
        verticalProgress.style.background = '#28a745';
    } else if (percentage >= 75) {
        character = '🤩'; // 거의 완료
        verticalProgress.style.background = 'linear-gradient(0deg, #28a745, #20c997)';
    } else if (percentage >= 50) {
        character = '😊'; // 절반 완료
        verticalProgress.style.background = 'linear-gradient(0deg, #ffc107, #fd7e14)';
    } else if (percentage >= 25) {
        character = '🙂'; // 시작
        verticalProgress.style.background = 'linear-gradient(0deg, #667eea, #764ba2)';
    } else if (percentage > 0) {
        character = '😐'; // 조금 시작
        verticalProgress.style.background = 'linear-gradient(0deg, #6c757d, #495057)';
    }
    
    characterElement.textContent = character;
}
};
