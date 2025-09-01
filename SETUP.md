# ExpatsJobs.cz Setup Guide

## 🚀 Quick Start

### 1. Push to GitHub
```bash
# After creating your GitHub repository, run:
git remote add origin https://github.com/YOUR_USERNAME/expatsjobs-cz.git
git branch -M main  
git push -u origin main
```

### 2. Link Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Deploy!

## 🔧 Environment Variables

Add these in your Vercel dashboard under Settings > Environment Variables:

### Required for Authentication
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-very-long-random-secret-key-here
```

### Required for Database (Neon)
```
DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/expatsjobs
```

### Required for File Storage
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

### Required for Payments
```
STRIPE_SECRET_KEY=sk_live_or_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_live_or_test_your_stripe_key
```

## 📊 Database Setup (Neon)

1. Visit [neon.tech](https://neon.tech)
2. Create a new project: "expatsjobs"
3. Copy the connection string
4. Run the migration:
   ```bash
   npx prisma db push
   ```

## 📁 File Storage Setup (Vercel Blob)

1. In Vercel dashboard → Storage
2. Create new Blob store
3. Copy the read/write token
4. Add to environment variables

## 💳 Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Set up webhook endpoints for payment confirmations
4. Add keys to environment variables

## 🎯 Next Steps After Setup

1. **Re-enable database features** - Uncomment Prisma code in:
   - `src/lib/auth.ts`
   - `src/app/api/auth/register/employer/route.ts`
   - `src/app/api/auth/register/job_seeker/route.ts`

2. **Test registration flow** - Try creating employer and job seeker accounts

3. **Set up custom domain** - Add expatsjobs.cz in Vercel settings

4. **Configure email notifications** - For job applications and confirmations

## 🚨 Current Status

- ✅ **Frontend**: Fully functional
- ✅ **UI/UX**: Complete job board experience
- ✅ **File uploads**: Ready for CVs and logos
- ⚠️ **Database**: Temporarily disabled (ready to enable)
- ⚠️ **Authentication**: Ready to enable with database
- ✅ **Payments**: Stripe integration ready

## 🔄 Deployment Workflow

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys
4. Review at your custom domain

---

**Need help?** The codebase is fully documented and ready for production!