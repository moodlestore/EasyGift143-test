// 인게이지먼트 어시스턴트 모듈
window.EngagementAssistant = {
    // 템플릿 데이터
    templates: {
        praise: ["정말 예쁘네요!", "멋진 사진이에요!", "스타일이 좋네요!", "너무 귀여워요!", "분위기가 좋네요!"],
        question: ["어디서 구매하셨나요?", "브랜드가 궁금해요!", "가격대가 어떻게 되나요?", "혹시 링크 있나요?", "어떤 사이즈인가요?"],
        empathy: ["저도 같은 생각이에요!", "공감합니다!", "정말 그래요!", "완전 동감해요!", "맞아요!"],
        recommendation: ["추천해주셔서 감사해요!", "꼭 써보고 싶어요!", "정보 감사합니다!", "좋은 정보네요!", "참고하겠습니다!"]
    },

    // HTML 반환
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
    <h2>🎯 오늘의 목표</h2>
    <div style="text-align: center; margin-bottom: 20px;">
        <p style="font-size: 1.1em; color: #667eea;">
            <strong>예상 소요시간:</strong> 약 90분 | 
            <strong>총 진행률:</strong> <span id="overallProgress">0%</span>
        </p>
    </div>
    
    <!-- 6:4 비율 레이아웃 -->
    <div style="display: flex; gap: 20px; align-items: flex-start;">
        <!-- 왼쪽 영역 (60%) - 통합 현황 -->
        <div style="flex: 6; background: white; padding: 20px; border-radius: 8px; border: 2px solid #667eea;">
            <h3 style="margin: 0 0 20px 0; text-align: center;">📊 전체 현황</h3>
            
            <div class="goal-item">
                <span>좋아요:</span>
                <div class="goal-controls">
                    <button onclick="EngagementAssistant.updateTotalGoal('likes', -1)">-</button>
                    <span id="total-likes">0</span>/<span id="total-likes-target">37</span>
                    <button onclick="EngagementAssistant.updateTotalGoal('likes', 1)">+</button>
                </div>
            </div>
            <div class="goal-item">
                <span>댓글:</span>
                <div class="goal-controls">
                    <button onclick="EngagementAssistant.updateTotalGoal('comments', -1)">-</button>
                    <span id="total-comments">0</span>/<span id="total-comments-target">12</span>
                    <button onclick="EngagementAssistant.updateTotalGoal('comments', 1)">+</button>
                </div>
            </div>
            <div class="goal-item">
                <span>팔로우:</span>
                <div class="goal-controls">
                    <button onclick="EngagementAssistant.updateTotalGoal('follows', -1)">-</button>
                    <span id="total-follows">0</span>/<span id="total-follows-target">8</span>
                    <button onclick="EngagementAssistant.updateTotalGoal('follows', 1)">+</button>
                </div>
            </div>
            
            <div class="progress-bar" style="margin-top: 15px;">
                <div class="progress-fill" id="total-progress" style="width: 0%;"></div>
            </div>
            
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="EngagementAssistant.resetDailyGoals()" style="background: #dc3545; font-size: 14px; padding: 8px 16px;">🔄 목표 초기화</button>
                <button onclick="EngagementAssistant.completeAllGoals()" style="background: #28a745; font-size: 14px; padding: 8px 16px;">✅ 모든 목표 완료</button>
            </div>
        </div>
        
        <!-- 오른쪽 영역 (40%) - 계정 관리 -->
        <div style="flex: 4; background: white; padding: 20px; border-radius: 8px; border: 2px solid #28a745;">
            <h3 style="margin: 0 0 20px 0; text-align: center;">⚙️ 계정 관리</h3>
            
            <!-- SNS 선택 -->
            <div class="form-group" style="margin-bottom: 15px;">
                <label for="snsSelect" style="font-size: 14px; margin-bottom: 5px;">SNS 플랫폼:</label>
                <select id="snsSelect" style="padding: 8px; font-size: 14px;">
                    <option value="instagram">📷 Instagram</option>
                    <option value="x">🐦 X (Twitter)</option>
                    <option value="threads">🧵 Threads</option>
                </select>
            </div>
            
            <!-- 언어 선택 -->
            <div class="form-group" style="margin-bottom: 15px;">
                <label for="languageSelect" style="font-size: 14px; margin-bottom: 5px;">언어:</label>
                <select id="languageSelect" style="padding: 8px; font-size: 14px;">
                    <option value="korean">🇰🇷 한국어</option>
                    <option value="japanese">🇯🇵 일본어</option>
                    <option value="french">🇫🇷 프랑스어</option>
                </select>
            </div>
            
            <!-- 추가/제거 버튼 -->
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button onclick="EngagementAssistant.addAccount()" style="flex: 1; background: #28a745; font-size: 14px; padding: 8px;">➕ 추가</button>
                <button onclick="EngagementAssistant.removeAccount()" style="flex: 1; background: #dc3545; font-size: 14px; padding: 8px;">➖ 제거</button>
            </div>
            
            <!-- 계정 목록 -->
            <div style="margin-bottom: 10px;">
                <label style="font-size: 14px; margin-bottom: 5px;">활성 계정 목록:</label>
            </div>
            <select id="accountList" size="8" style="width: 100%; font-size: 13px; padding: 5px;">
                <option value="instagram-korean">📷🇰🇷 Instagram - 한국어</option>
                <option value="instagram-japanese">📷🇯🇵 Instagram - 일본어</option>
                <option value="instagram-french">📷🇫🇷 Instagram - 프랑스어</option>
                <option value="x-korean">🐦🇰🇷 X - 한국어</option>
                <option value="x-japanese">🐦🇯🇵 X - 일본어</option>
                <option value="x-french">🐦🇫🇷 X - 프랑스어</option>
                <option value="threads-korean">🧵🇰🇷 Threads - 한국어</option>
                <option value="threads-japanese">🧵🇯🇵 Threads - 일본어</option>
                <option value="threads-french">🧵🇫🇷 Threads - 프랑스어</option>
            </select>
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
    const snsIcons = {
        instagram: '📷',
        x: '🐦',
        threads: '🧵'
    };
    
    const languageIcons = {
        korean: '🇰🇷',
        japanese: '🇯🇵',
        french: '🇫🇷'
    };
    
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
    
    return `${snsIcons[sns]}${languageIcons[language]} ${snsNames[sns]} - ${languageNames[language]}`;
}
};
