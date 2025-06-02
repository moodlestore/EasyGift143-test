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
                
                ${mode === 'free' ? `
                    <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3>🆓 Free 모드 기능</h3>
                        <ul>
                            <li>✅ 업계 표준 기반 일일 목표</li>
                            <li>✅ 3개 언어 번역 어시스턴트</li>
                            <li>✅ 댓글 템플릿 생성기</li>
                            <li>✅ 수동 데이터 입력</li>
                        </ul>
                    </div>
                ` : `
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3>💎 Pro 모드 기능</h3>
                        <ul>
                            <li>✅ AI 기반 맞춤 목표 설정</li>
                            <li>✅ Buffer Analytics 연동</li>
                            <li>✅ ManyChat Analytics 연동</li>
                            <li>✅ 실시간 성과 분석</li>
                        </ul>
                    </div>
                `}
                
                <!-- 일일 목표 섹션 -->
                <div class="section">
                    <h2>🎯 오늘의 목표</h2>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <p style="font-size: 1.1em; color: #667eea;">
                            <strong>예상 소요시간:</strong> 약 90분 | 
                            <strong>총 진행률:</strong> <span id="overallProgress">0%</span>
                        </p>
                    </div>
                    
                    <div class="goal-grid">
                        <div class="goal-card" data-lang="korean">
                            <h3>🇰🇷 한국어 계정 (3개)</h3>
                            <div class="goal-item">
                                <span>좋아요:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'likes', -1)">-</button>
                                    <span id="korean-likes">0</span>/<span id="korean-likes-target">15</span>
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'likes', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>댓글:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'comments', -1)">-</button>
                                    <span id="korean-comments">0</span>/<span id="korean-comments-target">5</span>
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'comments', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>팔로우:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'follows', -1)">-</button>
                                    <span id="korean-follows">0</span>/<span id="korean-follows-target">3</span>
                                    <button onclick="EngagementAssistant.updateGoal('korean', 'follows', 1)">+</button>
                                </div>
                            </div>
                            <div class="progress-bar" style="margin-top: 10px;">
                                <div class="progress-fill" id="korean-progress" style="width: 0%;"></div>
                            </div>
                        </div>
                        
                        <div class="goal-card" data-lang="japanese">
                            <h3>🇯🇵 일본어 계정 (3개)</h3>
                            <div class="goal-item">
                                <span>좋아요:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'likes', -1)">-</button>
                                    <span id="japanese-likes">0</span>/<span id="japanese-likes-target">12</span>
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'likes', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>댓글:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'comments', -1)">-</button>
                                    <span id="japanese-comments">0</span>/<span id="japanese-comments-target">4</span>
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'comments', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>팔로우:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'follows', -1)">-</button>
                                    <span id="japanese-follows">0</span>/<span id="japanese-follows-target">3</span>
                                    <button onclick="EngagementAssistant.updateGoal('japanese', 'follows', 1)">+</button>
                                </div>
                            </div>
                            <div class="progress-bar" style="margin-top: 10px;">
                                <div class="progress-fill" id="japanese-progress" style="width: 0%;"></div>
                            </div>
                        </div>
                        
                        <div class="goal-card" data-lang="french">
                            <h3>🇫🇷 프랑스어 계정 (3개)</h3>
                            <div class="goal-item">
                                <span>좋아요:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('french', 'likes', -1)">-</button>
                                    <span id="french-likes">0</span>/<span id="french-likes-target">10</span>
                                    <button onclick="EngagementAssistant.updateGoal('french', 'likes', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>댓글:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('french', 'comments', -1)">-</button>
                                    <span id="french-comments">0</span>/<span id="french-comments-target">3</span>
                                    <button onclick="EngagementAssistant.updateGoal('french', 'comments', 1)">+</button>
                                </div>
                            </div>
                            <div class="goal-item">
                                <span>팔로우:</span>
                                <div class="goal-controls">
                                    <button onclick="EngagementAssistant.updateGoal('french', 'follows', -1)">-</button>
                                    <span id="french-follows">0</span>/<span id="french-follows-target">2</span>
                                    <button onclick="EngagementAssistant.updateGoal('french', 'follows', 1)">+</button>
                                </div>
                            </div>
                            <div class="progress-bar" style="margin-top: 10px;">
                                <div class="progress-fill" id="french-progress" style="width: 0%;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="EngagementAssistant.resetDailyGoals()" style="background: #dc3545;">🔄 목표 초기화</button>
                        <button onclick="EngagementAssistant.completeAllGoals()" style="background: #28a745;">✅ 모든 목표 완료 (테스트)</button>
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
            Object.keys(AppState.dailyGoals).forEach(lang => {
                ['likes', 'comments', 'follows'].forEach(type => {
                    const element = document.getElementById(`${lang}-${type}`);
                    const targetElement = document.getElementById(`${lang}-${type}-target`);
                    if (element) {
                        element.textContent = AppState.dailyGoals[lang][type];
                    }
                    if (targetElement) {
                        targetElement.textContent = AppState.dailyGoals[lang].targets[type];
                    }
                });
                this.updateProgress(lang);
            });
            this.updateOverallProgress();
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
    }
};
