window.EngagementAssistant = {
    currentSelectedAccount: null,

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

                <div class="section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="margin: 0;">🎯 오늘의 목표</h2>
                    </div>
                    
                    <div style="display: flex; gap: 20px; align-items: stretch; min-height: 80px;">
                        <div style="flex: 6; background: white; padding: 20px; border-radius: 8px; border: 2px solid #667eea; display: flex; flex-direction: column; position: relative;">
                            <div style="position: absolute; top: 10px; left: 20px;">
                                <div style="color: #666; font-size: 20px; font-weight: bold;">2024.06.03</div>
                            </div>
                            
                            <div style="position: absolute; top: 10px; right: 20px; font-size: 1.1em; color: #667eea;">
                                <strong>총 진행률:</strong> <span id="overallProgress" style="font-size: 1.2em; color: #333;">0%</span>
                            </div>
                            
                            <div style="text-align: center; margin-top: 55px; margin-bottom: 20px;">
                                <h3 style="margin: 0; font-size: 1.6em; color: #333;"><span id="selectedAccountName">계정을 선택하세요</span></h3>
                            </div>
                            
                            <div style="position: absolute; top: 60%; left: 40px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 35px;">
                                <div style="display: flex; align-items: center; justify-content: flex-start; min-width: 300px;">
                                    <div style="font-size: 1.3em; color: #666; font-weight: bold; width: 80px;">포스팅</div>
                                    <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                                        <button onclick="EngagementAssistant.updateCurrentGoal('postings', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                                        <span style="display: flex; align-items: center;">
                                            <span id="current-postings" style="font-size: 1.5em; font-weight: bold;">0</span>
                                            <span style="color: #666; font-size: 1.2em; margin: 0 -6px;"> / </span>
                                            <span id="current-postings-target" style="font-size: 1.5em;">0</span>
                                        </span>
                                        <button onclick="EngagementAssistant.updateCurrentGoal('postings', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; justify-content: flex-start; min-width: 300px;">
                                    <div style="font-size: 1.3em; color: #666; font-weight: bold; width: 80px;">좋아요</div>
                                    <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                                        <button onclick="EngagementAssistant.updateCurrentGoal('likes', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                                        <span style="display: flex; align-items: center;">
                                            <span id="current-likes" style="font-size: 1.5em; font-weight: bold;">0</span>
                                            <span style="color: #666; font-size: 1.2em; margin: 0 -6px;"> / </span>
                                            <span id="current-likes-target" style="font-size: 1.5em;">0</span>
                                        </span>
                                        <button onclick="EngagementAssistant.updateCurrentGoal('likes', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; justify-content: flex-start; min-width: 300px;">
                                    <div style="font-size: 1.3em; color: #666; font-weight: bold; width: 80px;">댓글</div>
                                    <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                                        <button onclick="EngagementAssistant.updateCurrentGoal('comments', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                                        <span style="display: flex; align-items: center;">
                                            <span id="current-comments" style="font-size: 1.5em; font-weight: bold;">0</span>
                                            <span style="color: #666; font-size: 1.2em; margin: 0 -6px;"> / </span>
                                            <span id="current-comments-target" style="font-size: 1.5em;">0</span>
                                        </span>
                                        <button onclick="EngagementAssistant.updateCurrentGoal('comments', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; justify-content: flex-start; min-width: 300px;">
                                    <div style="font-size: 1.3em; color: #666; font-weight: bold; width: 80px;">팔로우</div>
                                    <div class="goal-controls" style="display: flex; align-items: center; gap: 8px;">
                                        <button onclick="EngagementAssistant.updateCurrentGoal('follows', -1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">-</button>
                                        <span style="display: flex; align-items: center;">
                                            <span id="current-follows" style="font-size: 1.5em; font-weight: bold;">0</span>
                                            <span style="color: #666; font-size: 1.2em; margin: 0 -6px;"> / </span>
                                            <span id="current-follows-target" style="font-size: 1.5em;">0</span>
                                        </span>
                                        <button onclick="EngagementAssistant.updateCurrentGoal('follows', 1)" style="width: 30px; height: 30px; font-size: 14px; border-radius: 50%; background: #667eea; color: white; border: none;">+</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="position: absolute; right: 25px; top: 60%; transform: translateY(-50%); display: flex; align-items: center; gap: 35px;">
                                <div style="width: 30px; height: 230px; background: #e9ecef; border-radius: 15px; position: relative; border: 2px solid #dee2e6;">
                                    <div id="verticalProgress" style="position: absolute; bottom: 0; width: 100%; background: #28a745; border-radius: 13px; transition: height 0.3s ease; height: 0%;"></div>
                                </div>
                                <div id="progressCharacter" style="font-size: 4em;">😴</div>
                            </div>
                        </div>
                        
                        <div style="flex: 4; background: white; padding: 20px; border-radius: 8px; border: 2px solid #28a745; display: flex; flex-direction: column; min-height: 60px;">
                            <h3 style="margin: 0 0 10px 0; text-align: center; font-size: 1.3em;">계정 관리</h3>
                            
                            <div class="form-group" style="margin-bottom: 8px;">
                                <label for="snsSelect" style="font-size: 14px; margin-bottom: 5px;">SNS 플랫폼</label>
                                <select id="snsSelect" style="padding: 10px; font-size: 14px;">
                                    <option value="instagram">Instagram</option>
                                    <option value="x">X (Twitter)</option>
                                    <option value="threads">Threads</option>
                                </select>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 15px;">
                                <label for="languageSelect" style="font-size: 14px; margin-bottom: 5px;">국가</label>
                                <select id="languageSelect" style="padding: 10px; font-size: 14px;">
                                    <option value="korea">한국</option>
                                    <option value="japan">일본</option>
                                    <option value="usa">미국</option>
                                    <option value="canada">캐나다</option>
                                </select>
                            </div>
                            
                            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                <button onclick="EngagementAssistant.addAccount()" style="flex: 1; background: #28a745; font-size: 14px; padding: 10px;">➕ 추가</button>
                                <button onclick="EngagementAssistant.removeAccount()" style="flex: 1; background: #dc3545; font-size: 14px; padding: 10px;">➖ 제거</button>
                            </div>
                            
                            <div style="margin-bottom: 10px;">
                                <label style="font-size: 14px; margin-bottom: 5px;">활성 계정 목록</label>
                            </div>
                            <select id="accountList" size="5" style="width: 100%; font-size: 14px; padding: 5px; flex: 1;" onchange="EngagementAssistant.selectAccount()">
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 번역 도우미 -->
            <div class="section">
                <h2>🌐 번역 도우미</h2>
                
                <div class="form-group">
                    <label for="translationWebhook">웹훅 URL:</label>
                    <div class="url-input-group">
                        <input type="text" id="translationWebhook" placeholder="번역 웹훅 URL을 입력하세요">
                        <button onclick="EngagementAssistant.saveTranslationWebhook()">저장</button>
                    </div>
                    <span id="translationWebhookSaved" class="saved-indicator" style="display: none;">✅ 저장됨</span>
                </div>
                
                <div class="form-group">
                    <label for="originalText">원문 (한국어):</label>
                    <textarea id="originalText" rows="3" placeholder="번역할 한국어 텍스트를 입력하세요..."></textarea>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <button onclick="EngagementAssistant.translateText()">🌐 번역</button>
                </div>
                
                <div class="form-group">
                    <label for="translationResult">번역 결과:</label>
                    <textarea id="translationResult" rows="6" readonly placeholder=""></textarea>
                </div>
            </div>
        `;
    },

    initialize: function() {
        this.checkMidnightReset();
        this.restoreGoalsState();
        this.initializeAccountList();
        this.loadSavedTranslationWebhook();
    },

    restoreGoalsState: function() {
        setTimeout(() => {
            ['postings', 'likes', 'comments', 'follows'].forEach(type => {
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

    initializeAccountList: function() {
        if (!AppState.accountList) {
            AppState.accountList = [
                'instagram-korea', 'instagram-japan', 'instagram-usa',
                'x-korea', 'x-japan', 'x-usa',
                'threads-korea', 'threads-japan', 'threads-usa'
            ];
        }
        this.updateAccountListDisplay();
        this.restoreLastSelectedAccount();
    },

    restoreLastSelectedAccount: function() {
        setTimeout(() => {
            const accountList = document.getElementById('accountList');
            if (!accountList || accountList.options.length === 0) return;
            
            const lastSelectedAccount = Utils.safeStorage.get('lastSelectedAccount', '');
            let targetIndex = 0;
            
            if (lastSelectedAccount) {
                for (let i = 0; i < accountList.options.length; i++) {
                    if (accountList.options[i].value === lastSelectedAccount) {
                        targetIndex = i;
                        break;
                    }
                }
            }
            
            accountList.selectedIndex = targetIndex;
            this.currentSelectedAccount = accountList.options[targetIndex].value;
            this.updateCurrentAccountDisplay();
            
            if (lastSelectedAccount && targetIndex > 0) {
                Utils.showAchievement(`마지막 선택 계정 "${this.getAccountDisplayName(...this.currentSelectedAccount.split('-'))}"이 자동으로 선택되었습니다! 🎯`);
            }
        }, 200);
    },

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

    removeAccount: function() {
        const accountList = document.getElementById('accountList');
        const selectedOption = accountList.options[accountList.selectedIndex];
        
        if (selectedOption) {
            const accountKey = selectedOption.value;
            const index = AppState.accountList.indexOf(accountKey);
            
            if (index > -1) {
                AppState.accountList.splice(index, 1);
                
                const lastSelectedAccount = Utils.safeStorage.get('lastSelectedAccount', '');
                if (lastSelectedAccount === accountKey) {
                    Utils.safeStorage.remove('lastSelectedAccount');
                    this.currentSelectedAccount = null;
                }
                
                this.updateAccountListDisplay();
                AppState.saveAppState();
                Utils.showAchievement(`${selectedOption.text} 계정이 제거되었습니다!`);
                
                setTimeout(() => {
                    const updatedAccountList = document.getElementById('accountList');
                    if (updatedAccountList && updatedAccountList.options.length > 0) {
                        updatedAccountList.selectedIndex = 0;
                        this.currentSelectedAccount = updatedAccountList.options[0].value;
                        this.updateCurrentAccountDisplay();
                        Utils.safeStorage.set('lastSelectedAccount', this.currentSelectedAccount);
                    } else {
                        this.currentSelectedAccount = null;
                        this.updateCurrentAccountDisplay();
                    }
                }, 100);
            }
        } else {
            Utils.showAchievement('제거할 계정을 선택해주세요.', 'error');
        }
    },

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
        
        const snsFormatted = snsNames[sns].padEnd(10, ' ');
        
        return `${snsFormatted} / ${languageNames[language]}`;
    },

    selectAccount: function() {
        const accountList = document.getElementById('accountList');
        const selectedOption = accountList.options[accountList.selectedIndex];
        
        if (selectedOption) {
            this.currentSelectedAccount = selectedOption.value;
            this.updateCurrentAccountDisplay();
            Utils.safeStorage.set('lastSelectedAccount', this.currentSelectedAccount);
        }
    },

    updateCurrentAccountDisplay: function() {
        if (!this.currentSelectedAccount) {
            document.getElementById('selectedAccountName').textContent = '계정을 선택하세요';
            return;
        }
        
        const [sns, language] = this.currentSelectedAccount.split('-');
        const displayName = this.getAccountDisplayName(sns, language);
        document.getElementById('selectedAccountName').textContent = displayName;
        
        const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
        
        document.getElementById('current-postings').textContent = accountGoals.postings;
        document.getElementById('current-postings-target').textContent = accountGoals.targets.postings;
        document.getElementById('current-likes').textContent = accountGoals.likes;
        document.getElementById('current-likes-target').textContent = accountGoals.targets.likes;
        document.getElementById('current-comments').textContent = accountGoals.comments;
        document.getElementById('current-comments-target').textContent = accountGoals.targets.comments;
        document.getElementById('current-follows').textContent = accountGoals.follows;
        document.getElementById('current-follows-target').textContent = accountGoals.targets.follows;
        
        this.updateCurrentProgress();
    },

    getAccountGoals: function(accountKey) {
        if (!AppState.accountGoals) {
            AppState.accountGoals = {};
        }
        
        if (!AppState.accountGoals[accountKey]) {
            const [sns, language] = accountKey.split('-');
            AppState.accountGoals[accountKey] = {
                postings: 0, likes: 0, comments: 0, follows: 0,
                targets: this.getDefaultTargets(sns, language)
            };
        }
        
        return AppState.accountGoals[accountKey];
    },

    getDefaultTargets: function(sns, language) {
        const baseTargets = {
            instagram: { postings: 2, likes: 40, comments: 20, follows: 20 },
            x: { postings: 15, likes: 50, comments: 30, follows: 30 },
            threads: { postings: 2, likes: 40, comments: 20, follows: 20 }
        };
        
        return baseTargets[sns] || { postings: 2, likes: 3, comments: 1, follows: 1 };
    },

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
        
        document.getElementById(`current-${type}`).textContent = newValue;
        this.updateCurrentProgress();
        
        if (newValue === target) {
            Utils.showAchievement(`${this.currentSelectedAccount} ${type} 목표 달성! 🎉`);
        }
        
        AppState.saveAppState();
    },

    updateCurrentProgress: function() {
        if (!this.currentSelectedAccount) {
            this.updateProgressCharacter(0);
            return;
        }
        
        const accountGoals = this.getAccountGoals(this.currentSelectedAccount);
        const totalCurrent = accountGoals.postings + accountGoals.likes + accountGoals.comments + accountGoals.follows;
        const totalTarget = accountGoals.targets.postings + accountGoals.targets.likes + accountGoals.targets.comments + accountGoals.targets.follows;
        const percentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
        
        this.updateProgressCharacter(percentage);
        this.updateTotalProgress();
    },

    updateTotalProgress: function() {
        let totalCurrent = 0;
        let totalTarget = 0;
        
        AppState.accountList.forEach(accountKey => {
            const accountGoals = this.getAccountGoals(accountKey);
            totalCurrent += accountGoals.postings + accountGoals.likes + accountGoals.comments + accountGoals.follows;
            totalTarget += accountGoals.targets.postings + accountGoals.targets.likes + accountGoals.targets.comments + accountGoals.targets.follows;
        });
        
        const percentage = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
        document.getElementById('overallProgress').textContent = `${percentage}%`;
        
        if (percentage >= 100) {
            Utils.showAchievement('🎉 모든 목표 달성! 오늘 정말 수고하셨습니다!');
        }
    },

    checkMidnightReset: function() {
        const lastResetDate = Utils.safeStorage.get('lastResetDate', '');
        const today = new Date().toDateString();
        
        if (lastResetDate !== today) {
            this.resetAllGoals();
            Utils.safeStorage.set('lastResetDate', today);
            Utils.showAchievement('자정이 지나 목표가 자동으로 리셋되었습니다! 🌅');
        }
    },

    resetAllGoals: function() {
        if (AppState.accountGoals) {
            Object.keys(AppState.accountGoals).forEach(accountKey => {
                AppState.accountGoals[accountKey].postings = 0;
                AppState.accountGoals[accountKey].likes = 0;
                AppState.accountGoals[accountKey].comments = 0;
                AppState.accountGoals[accountKey].follows = 0;
            });
        }
        
        if (this.currentSelectedAccount) {
            this.updateCurrentAccountDisplay();
        }
        
        AppState.saveAppState();
    },
	
	// 번역 웹훅 URL 저장
    saveTranslationWebhook: function() {
        const webhookUrl = document.getElementById('translationWebhook').value.trim();
        const indicator = document.getElementById('translationWebhookSaved');
        
        if (webhookUrl) {
            Utils.safeStorage.set('translationWebhookUrl', webhookUrl);
            this.showSavedIndicator(indicator);
            Utils.showAchievement('번역 웹훅 URL이 저장되었습니다.', 'success');
        } else {
            Utils.showAchievement('웹훅 URL을 입력해주세요.', 'error');
        }
    },

    // 저장된 번역 웹훅 URL 로드
    loadSavedTranslationWebhook: function() {
        const savedUrl = Utils.safeStorage.get('translationWebhookUrl', '');
        if (savedUrl) {
            document.getElementById('translationWebhook').value = savedUrl;
            const indicator = document.getElementById('translationWebhookSaved');
            this.showSavedIndicator(indicator);
        }
    },

    // 저장 표시기 표시
    showSavedIndicator: function(indicator) {
        if (indicator) {
            indicator.style.display = 'inline';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 3000);
        }
    },
	
	// 번역 기능
    translateText: function() {
        const webhookUrl = document.getElementById('translationWebhook').value.trim();
        const originalText = document.getElementById('originalText').value.trim();
        const resultTextarea = document.getElementById('translationResult');
        
        if (!webhookUrl) {
            Utils.showAchievement('웹훅 URL을 입력해주세요.', 'error');
            return;
        }
        
        if (!originalText) {
            Utils.showAchievement('번역할 텍스트를 입력해주세요.', 'error');
            return;
        }
        
        // 번역 대상 언어 목록 생성 (한국 제외)
        const languageNames = {
            japan: '일본어',
            usa: '영어 (미국)',
            canada: '영어 (캐나다)'
        };
        
        const targetLanguages = Object.keys(languageNames);
        
        resultTextarea.value = '번역 중...';
        
        // 웹훅으로 번역 요청
        const requestData = {
            original_text: originalText,
            target_languages: targetLanguages,
            timestamp: new Date().toISOString()
        };
        
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let resultText = `원문 (한국어): ${originalText}\n\n`;
                
                targetLanguages.forEach(lang => {
                    if (data.translations && data.translations[lang]) {
                        resultText += `${languageNames[lang]}: ${data.translations[lang]}\n\n`;
                    }
                });
                
                resultTextarea.value = resultText.trim();
                Utils.showAchievement('번역이 완료되었습니다! 🌐');
            } else {
                resultTextarea.value = '번역 중 오류가 발생했습니다.';
                Utils.showAchievement('번역 실패: ' + (data.error || '알 수 없는 오류'), 'error');
            }
        })
        .catch(error => {
            console.error('번역 오류:', error);
            resultTextarea.value = '네트워크 오류가 발생했습니다.';
            Utils.showAchievement('번역 요청 실패: ' + error.message, 'error');
        });
    },

    updateProgressCharacter: function(percentage) {
        const characterElement = document.getElementById('progressCharacter');
        const verticalProgress = document.getElementById('verticalProgress');
        
        if (!characterElement || !verticalProgress) return;
        
        verticalProgress.style.height = `${percentage}%`;
        
        let character = '😴';
        
        if (percentage >= 100) {
            character = '🎉';
            verticalProgress.style.background = '#28a745';
        } else if (percentage >= 75) {
            character = '🤩';
            verticalProgress.style.background = 'linear-gradient(0deg, #28a745, #20c997)';
        } else if (percentage >= 50) {
            character = '😊';
            verticalProgress.style.background = 'linear-gradient(0deg, #ffc107, #fd7e14)';
        } else if (percentage >= 25) {
            character = '🙂';
            verticalProgress.style.background = 'linear-gradient(0deg, #667eea, #764ba2)';
        } else if (percentage > 0) {
            character = '😐';
            verticalProgress.style.background = 'linear-gradient(0deg, #6c757d, #495057)';
        }
        
        characterElement.textContent = character;
    }
};
